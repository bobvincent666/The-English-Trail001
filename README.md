# The English Trail

## Run locally

From this directory:

```powershell
python serve.py
```

Open http://localhost:8080/ in a browser. The server sends `.mjs` files as JavaScript on systems where Python defaults to `text/plain`. Do not open `index.html` directly with `file://`, because YouTube embeds may reject requests without an HTTP referrer.

## Run checks

```powershell
node --test tests/*.test.mjs
```

Progress is stored in this browser's localStorage. Clearing site data removes it.
