#!/usr/bin/env python3
"""
main.py — Students Management System Backend (Standard Library)
Zero external dependencies required (No pip install needed).

Run:
    python main.py
"""

import json
import os
import re
import socketserver
import sys
import urllib.parse
from datetime import date
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths Configuration
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR if (BASE_DIR / "HTML").is_dir() else BASE_DIR.parent
HTML_DIR = REPO_ROOT / "HTML"
CSS_DIR = REPO_ROOT / "CSS"
JS_DIR = REPO_ROOT / "JS"
DATA_FILE = BASE_DIR / "students.json"

SAMPLE_STUDENTS = [
    {
        "id": "S001",
        "firstName": "Aarav",
        "lastName": "Sharma",
        "email": "aarav.sharma@example.com",
        "phone": "+91-90000-00001",
        "category": "Undergraduate",
        "status": "active",
        "gpa": 3.8,
        "enrollmentDate": "2023-08-15",
        "address": "12 MG Road, Bengaluru",
        "certifications": ["Python for Data Science"],
    },
    {
        "id": "S002",
        "firstName": "Diya",
        "lastName": "Patel",
        "email": "diya.patel@example.com",
        "phone": "+91-90000-00002",
        "category": "Graduate",
        "status": "active",
        "gpa": 3.5,
        "enrollmentDate": "2022-01-10",
        "address": "45 Residency Road, Bengaluru",
        "certifications": [],
    },
]

# ---------------------------------------------------------------------------
# Data Layer
# ---------------------------------------------------------------------------
def load_students():
    if not DATA_FILE.exists():
        save_students(SAMPLE_STUDENTS)
        return list(SAMPLE_STUDENTS)
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except Exception:
            return list(SAMPLE_STUDENTS)

def save_students(students):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(students, f, indent=2)

def new_id(students):
    used = {s["id"] for s in students}
    n = len(students) + 1
    candidate = f"S{n:03d}"
    while candidate in used:
        n += 1
        candidate = f"S{n:03d}"
    return candidate

REQUIRED_FIELDS = ["firstName", "lastName", "email", "phone", "category", "status"]

def validate_payload(payload, partial=False):
    errors = []
    fields = REQUIRED_FIELDS if not partial else [f for f in REQUIRED_FIELDS if f in payload]
    for field in fields:
        if not payload.get(field):
            errors.append(f"'{field}' is required")
    if "email" in payload and payload["email"] and "@" not in payload["email"]:
        errors.append("'email' must be a valid email address")
    if "gpa" in payload and payload["gpa"] not in (None, ""):
        try:
            gpa = float(payload["gpa"])
            if not (0 <= gpa <= 4.0):
                errors.append("'gpa' must be between 0 and 4.0")
        except (TypeError, ValueError):
            errors.append("'gpa' must be a number")
    return errors

# ---------------------------------------------------------------------------
# HTTP Request Handler
# ---------------------------------------------------------------------------
class StudentDevServerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(REPO_ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def _send_json(self, data, status=HTTPStatus.OK):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _get_json_body(self):
        content_len = int(self.headers.get("Content-Length", 0))
        if content_len == 0:
            return {}
        try:
            return json.loads(self.rfile.read(content_len).decode("utf-8"))
        except Exception:
            return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Health Check
        if path == "/api/health":
            self._send_json({"status": "ok"})
            return

        # List / Search Students
        if path == "/api/students":
            students = load_students()
            search = query.get("search", [""])[0].strip().lower()
            category = query.get("category", [None])[0]
            status_val = query.get("status", [None])[0]

            if search:
                students = [
                    s for s in students
                    if search in s.get("firstName", "").lower()
                    or search in s.get("lastName", "").lower()
                    or search in s.get("email", "").lower()
                    or search in str(s.get("phone", ""))
                ]
            if category:
                students = [s for s in students if s.get("category") == category]
            if status_val:
                students = [s for s in students if s.get("status") == status_val]

            total = len(students)
            avg_gpa = round(sum(s.get("gpa", 0) for s in students) / total, 2) if total else 0
            self._send_json({
                "students": students,
                "stats": {
                    "total": total,
                    "active": len([s for s in students if s.get("status") == "active"]),
                    "totalFees": None,
                    "averageGpa": avg_gpa,
                },
            })
            return

        # Get Single Student
        m = re.match(r"^/api/students/([^/]+)$", path)
        if m:
            student_id = m.group(1)
            students = load_students()
            student = next((s for s in students if s["id"] == student_id), None)
            if not student:
                self._send_json({"error": "Student not found"}, status=HTTPStatus.NOT_FOUND)
            else:
                self._send_json(student)
            return

        # Frontend Route Handling
        if path == "/":
            self.path = "/HTML/sigin.html"
            return super().do_GET()

        clean_path = path.lstrip("/")
        if clean_path.endswith(".html"):
            if (HTML_DIR / clean_path).is_file():
                self.path = f"/HTML/{clean_path}"
                return super().do_GET()
        else:
            if (HTML_DIR / f"{clean_path}.html").is_file():
                self.path = f"/HTML/{clean_path}.html"
                return super().do_GET()

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/students":
            payload = self._get_json_body()
            errors = validate_payload(payload)
            if errors:
                self._send_json({"errors": errors}, status=HTTPStatus.BAD_REQUEST)
                return

            students = load_students()
            student = {
                "id": new_id(students),
                "firstName": payload["firstName"],
                "lastName": payload["lastName"],
                "email": payload["email"],
                "phone": payload["phone"],
                "category": payload["category"],
                "status": payload["status"],
                "gpa": float(payload.get("gpa", 0) or 0),
                "enrollmentDate": payload.get("enrollmentDate", str(date.today())),
                "address": payload.get("address", ""),
                "certifications": payload.get("certifications", []),
            }
            students.append(student)
            save_students(students)
            self._send_json(student, status=HTTPStatus.CREATED)
            return

        self._send_json({"error": "Endpoint not found"}, status=HTTPStatus.NOT_FOUND)

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        m = re.match(r"^/api/students/([^/]+)$", parsed.path)
        if m:
            student_id = m.group(1)
            payload = self._get_json_body()
            errors = validate_payload(payload, partial=True)
            if errors:
                self._send_json({"errors": errors}, status=HTTPStatus.BAD_REQUEST)
                return

            students = load_students()
            for i, s in enumerate(students):
                if s["id"] == student_id:
                    students[i] = {**s, **payload, "id": student_id}
                    save_students(students)
                    self._send_json(students[i])
                    return
            self._send_json({"error": "Student not found"}, status=HTTPStatus.NOT_FOUND)
            return

        self._send_json({"error": "Endpoint not found"}, status=HTTPStatus.NOT_FOUND)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        m = re.match(r"^/api/students/([^/]+)$", parsed.path)
        if m:
            student_id = m.group(1)
            students = load_students()
            remaining = [s for s in students if s["id"] != student_id]
            if len(remaining) == len(students):
                self._send_json({"error": "Student not found"}, status=HTTPStatus.NOT_FOUND)
                return
            save_students(remaining)
            self._send_json({"deleted": student_id})
            return

        self._send_json({"error": "Endpoint not found"}, status=HTTPStatus.NOT_FOUND)


class ThreadedServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    load_students()
    PORT = 5000
    print("=" * 60)
    print(f" 🎓 Students Management Backend running on http://127.0.0.1:{PORT}")
    print(" 📄 Frontend Views: /home, /sigin, /sigup, /profile, /finance, /education, /contact")
    print(" 🔌 API Base:       http://127.0.0.1:5000/api/students")
    print("=" * 60)
    with ThreadedServer(("127.0.0.1", PORT), StudentDevServerHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
