"""
Students Management System - Production Server (main.py)
─────────────────────────────────────────────────────────
Serves the Students Management System web application over HTTP.
Optimized for deployment with logging, error handling, and security features.

Usage:
    python main.py              # Run on default port 8000
    PORT=9000 python main.py    # Run on custom port
    ENVIRONMENT=production python main.py  # Production mode
"""

import http.server
import logging
import os
import socketserver
import signal
import sys
import time
from datetime import datetime
from pathlib import Path

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════

# Server settings
PORT = int(os.getenv("PORT", 5500))
HOST = os.getenv("HOST", "127,0,0,1")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
AUTO_OPEN_BROWSER = ENVIRONMENT != "production"

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENTRY_PAGE = "http://127.0.0.1:5500/HTML/home.html"
LOG_DIR = Path(BASE_DIR) / "logs"
LOG_FILE = LOG_DIR / f"server_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

# Ensure logs directory exists
LOG_DIR.mkdir(exist_ok=True)

# ═══════════════════════════════════════════════════════════════════════════════
# LOGGING SETUP
# ═══════════════════════════════════════════════════════════════════════════════

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# ═══════════════════════════════════════════════════════════════════════════════
# HTTP REQUEST HANDLER
# ═══════════════════════════════════════════════════════════════════════════════

class ProductionHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """
    Production-grade HTTP handler with:
    - Proper security headers
    - Clean logging
    - Default index file serving
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, format, *args):
        """Override to use the application logger."""
        logger.info(format % args)

    def end_headers(self):
        """Add security headers to all responses."""
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("X-XSS-Protection", "1; mode=block")
        super().end_headers()

    def translate_path(self, path):
        """Serve index.html for directory requests."""
        path = super().translate_path(path)
        if os.path.isdir(path):
            index_file = os.path.join(path, "index.html")
            if os.path.exists(index_file):
                return index_file
        return path


# ═══════════════════════════════════════════════════════════════════════════════
# SERVER MANAGEMENT
# ═══════════════════════════════════════════════════════════════════════════════

class GracefulShutdownServer(socketserver.TCPServer):
    """TCP Server with graceful shutdown handling."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.allow_reuse_address = True
        self._shutdown_event = False
    
    def handle_shutdown(self, signum, frame):
        """Handle shutdown signals gracefully."""
        logger.info("Shutdown signal received (SIGTERM/SIGINT)")
        self._shutdown_event = True
        self.shutdown()


def print_banner():
    """Display server startup information."""
    banner = f"""
╔════════════════════════════════════════════════════════════════════════════╗
║                  📚 STUDENTS MANAGEMENT SYSTEM                            ║
║                       Production Server v1.0                              ║
╚════════════════════════════════════════════════════════════════════════════╝

🔧 SERVER CONFIGURATION
├─ Environment    : {ENVIRONMENT.upper()}
├─ Host Address   : {HOST}
├─ Port           : {PORT}
├─ Root Directory : {BASE_DIR}
├─ Entry Point    : {ENTRY_PAGE}
└─ Log File       : {LOG_FILE}

📡 ACCESS INFORMATION
├─ Server URL     : http://localhost:{PORT}/
└─ Application    : http://localhost:{PORT}/{ENTRY_PAGE}

⚠️  CONTROLS
└─ Press Ctrl+C to gracefully shutdown the server

{"="*80}
"""
    print(banner)


def run_server():
    """Start the production HTTP server."""
    try:
        # Verify project structure
        html_dir = os.path.join(BASE_DIR, "HTML")
        if not os.path.exists(html_dir):
            logger.error(f"HTML directory not found: {html_dir}")
            sys.exit(1)
        
        entry_file = os.path.join(BASE_DIR, ENTRY_PAGE)
        if not os.path.exists(entry_file):
            logger.warning(f"Entry point not found: {entry_file}")
        
        # Change to base directory
        os.chdir(BASE_DIR)
        logger.info(f"Working directory set to: {BASE_DIR}")
        
        # Create server
        server = GracefulShutdownServer((HOST, PORT), ProductionHTTPHandler)
        
        # Register signal handlers
        signal.signal(signal.SIGINT, server.handle_shutdown)
        signal.signal(signal.SIGTERM, server.handle_shutdown)
        
        # Display banner
        print_banner()
        logger.info("✅ Server starting...")
        
        # Start serving
        server.serve_forever()
        
    except OSError as e:
        logger.error(f"Failed to start server on {HOST}:{PORT}")
        logger.error(f"Error: {e}")
        if "Address already in use" in str(e):
            logger.error(f"Port {PORT} is already in use. Try a different port:")
            logger.error(f"  PORT=9000 python main.py")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)
    finally:
        logger.info("✅ Server shutdown complete")


# ═══════════════════════════════════════════════════════════════════════════════
# ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    run_server()