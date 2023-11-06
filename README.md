# http-redirect

An easy to use http redirect server configurable using only environment variables.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

During development run:

```bash
bun run dev
```

## Configuration

The server is configured using environment variables. This makes it easy to deploy on kubernetes or docker compose.

```dosini
DEFAULT_REDIRECT_URL="https://google.com"
DEFAULT_REDIRECT_CODE=302

REDIRECT_EXAMPLE_COM_URL="https://something.io"
REDIRECT_EXAMPLE_COM_CODE=301
REDIRECT_EXAMPLE_COM_KEEP_PATH=true

REDIRECT_SUB_EXAMPLE_COM_URL="https://hello.io"
REDIRECT_SUB_EXAMPLE_COM_CODE=302
REDIRECT_SUB_EXAMPLE_COM_KEEP_PATH=false

```

This config does the following

example.com => https://something.io while keeping the path on example.com and using permanent redirection

sub.example.com => https://something.io while keeping ignoring the path on example.com and using temporary redirection

