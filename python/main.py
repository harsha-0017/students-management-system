"""
Students Management System - Dashboard Server Launcher (main.py)
-----------------------------------------------------------------
Serves the project directory over port 5500 and opens the Dashboard
(http://127.0.0.1:5500/HTML/home.html).
"""

import http.server
import os
import socketserver
import sys
import threading
import time
import webbrowser

# Configuration
PORT = 5500
ENTRY_PAGE = "HTML/home.html"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """Handler to serve static files relative to the project root directory."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, format, *args):
        # Clean terminal output
        sys.stdout.write(f"[{time.strftime('%H:%M:%S')}] {format % args}\n")


def open_browser():
    """Waits for the server to bind, then launches the browser directly to the dashboard."""
    time.sleep(1)
    target_url = f"http://127.0.0.1:{PORT}/{ENTRY_PAGE}"
    print(f"[*] Opening Dashboard at: {target_url}")
    webbrowser.open(target_url)


def run_server():
    """Starts the local static file server."""
    os.chdir(BASE_DIR)

    # Enable address reuse to avoid port conflict delays on restart
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("127.0.0.1", PORT), CustomHTTPHandler) as httpd:
            print("=" * 60)
            print(" 🎓 Students Management System - Dashboard Server")
            print("=" * 60)
            print(f"[*] Root Directory : {BASE_DIR}")
            print(f"[*] Dashboard URL  : http://127.0.0.1:{PORT}/{ENTRY_PAGE}")
            print("-" * 60)
            print("[*] Press Ctrl+C to terminate.")
            print("=" * 60)

            # Open browser in a separate background thread
            threading.Thread(target=open_browser, daemon=True).start()

            # Serve continuously
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n[*] Server stopped.")
        sys.exit(0)
    except OSError as e:
        print(f"\n[!] Could not bind to port {PORT}: {e}")
        print("[!] Ensure port 5500 is not in use by VS Code Live Server.")
        sys.exit(1)


if __name__ == "__main__":
    run_server()
