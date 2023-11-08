# http-redirect

An easy to use http redirect server configurable using only environment variables.

## Usage

This small server is available as a docker image from ghcr.io.

```bash
docker pull ghcr.io/egidiusmengelberg/http-redirect:latest
```

## Configuration

The server is configured using environment variables. This makes it easy to deploy on kubernetes or docker compose.

```dosini

PORT=1234 # default is 3000
DEBUG=true # default is false (logs redirects)

DEFAULT_REDIRECT_URL="https://google.com"
DEFAULT_REDIRECT_CODE=302

REDIRECT_EXAMPLE_COM_URL="https://something.io"
REDIRECT_EXAMPLE_COM_CODE=301
REDIRECT_EXAMPLE_COM_KEEP_PATH=true

REDIRECT_SUB_EXAMPLE_COM_URL="https://hello.io"
REDIRECT_SUB_EXAMPLE_COM_CODE=302
REDIRECT_SUB_EXAMPLE_COM_KEEP_PATH=false

```

The env above results in the following:

| From              | To                    | Code | Keep Path  |
| ----------------- | --------------------- | ---- | ---------- |
| example.com       | https://something.io  | 301  | true       |
| sub.example.com   | https://hello.io      | 302  | false      |
| *                 | https://google.com    | 302  | false      |

> [!NOTE]
> It's not possible to keep the path on the default redirect.

## Development

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

During development you can add a .env file to easily manage your environment variables


