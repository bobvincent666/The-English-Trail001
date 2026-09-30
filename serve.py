"""Local preview with a JavaScript MIME type for ES modules."""

from http.server import SimpleHTTPRequestHandler, test


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".mjs": "text/javascript"}


if __name__ == "__main__":
    test(HandlerClass=Handler, port=8080)
