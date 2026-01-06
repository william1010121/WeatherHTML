import http.server
import socketserver
import threading
import sys
import os
import time
from proxy_server import ProxyHandler, PORT as PROXY_PORT

# Configuration
FRONTEND_PORT = 5500  # Standard VS Code Live Server port, or change to 8080/3000

def run_proxy():
    """Runs the CORS Proxy Server on port 8000."""
    try:
        # Allow reusing the address to avoid "Address already in use" errors on restart
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(('', PROXY_PORT), ProxyHandler) as httpd:
            print(f"✅ Backend Proxy running at http://localhost:{PROXY_PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"❌ Proxy Error: {e}")
        os._exit(1)

def run_frontend():
    """Runs a simple HTTP server for the frontend."""
    try:
        # Change directory to current folder if needed, though running from root is best
        handler = http.server.SimpleHTTPRequestHandler
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(('', FRONTEND_PORT), handler) as httpd:
            print(f"✅ Frontend Server running at http://localhost:{FRONTEND_PORT}")
            print(f"👉 Open your browser at: http://localhost:{FRONTEND_PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"❌ Frontend Server Error: {e}")
        os._exit(1)

if __name__ == "__main__":
    print("🚀 Starting WeatherHTML Development Environment...")
    print(f"🏠 Frontend Port: {FRONTEND_PORT}")
    print(f"🔌 Backend Proxy Port: {PROXY_PORT}")
    print("-" * 40)
    
    # Start Proxy in a separate thread
    proxy_thread = threading.Thread(target=run_proxy, daemon=True)
    proxy_thread.start()
    
    # Start Frontend in the main thread (or separate if you prefer)
    # We'll run frontend in a thread too so we can catch KeyboardInterrupt cleanly
    frontend_thread = threading.Thread(target=run_frontend, daemon=True)
    frontend_thread.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Shutting down servers...")
        sys.exit(0)
