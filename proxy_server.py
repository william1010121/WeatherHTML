import http.server
import socketserver
import urllib.request
import urllib.error
import sys

# Configuration
PORT = 8000
TARGET_URL = "https://meteo.local2.tempestdigi.com"

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        """Helper to send CORS headers for every response."""
        self.send_header('Access-Control-Allow-Origin', self.headers.get('Origin', '*'))
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Account, X-Password, ngrok-skip-browser-warning')
        self.send_header('Access-Control-Allow-Credentials', 'true')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def handle_proxy(self):
        url = f"{TARGET_URL}{self.path}"
        
        # Read request body
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length) if content_length > 0 else None

        # Prepare headers to forward
        headers = {key: value for key, value in self.headers.items() 
                   if key.lower() not in ('host', 'connection', 'origin', 'content-length')}
        
        # Log the request
        print(f"Proxying {self.command} {self.path} -> {url}")

        req = urllib.request.Request(url, data=body, headers=headers, method=self.command)
        
        try:
            with urllib.request.urlopen(req) as response:
                self.send_response(response.status)
                for key, value in response.getheaders():
                    # Strip headers that might interfere with the browser's handling
                    if key.lower() not in ('transfer-encoding', 'content-encoding', 'content-length', 'access-control-allow-origin', 'access-control-allow-credentials'):
                        self.send_header(key, value)
                
                # Add CORS headers for the local browser
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(response.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for key, value in e.headers.items():
                if key.lower() not in ('transfer-encoding', 'content-encoding', 'content-length', 'access-control-allow-origin', 'access-control-allow-credentials'):
                    self.send_header(key, value)
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            print(f"Proxy Error: {e}")
            self.send_response(500)
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(str(e).encode())

    def do_GET(self): self.handle_proxy()
    def do_POST(self): self.handle_proxy()
    def do_PUT(self): self.handle_proxy()
    def do_DELETE(self): self.handle_proxy()
    def do_PATCH(self): self.handle_proxy()

def run():
    # Use threading or fork to handle concurrent requests if needed, 
    # but for dev, a simple TCPServer is usually enough.
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
        print(f"CORS Proxy serving at http://localhost:{PORT}")
        print(f"Forwarding to: {TARGET_URL}")
        print("Keep this script running while developing.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down proxy...")
            sys.exit(0)

if __name__ == "__main__":
    run()