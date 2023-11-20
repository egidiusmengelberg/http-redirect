import parseEnv from "./parseEnv"
import { parseEnvBool, parseEnvNumber, parseEnvString } from "./utils"

console.log('Starting http-redirect')

const redirects = parseEnv()

const default_redirect: string = parseEnvString('DEFAULT_REDIRECT','https://www.example.com')
const default_redirect_code: number = parseEnvNumber('DEFAULT_REDIRECT_CODE', 302)

console.log(`Default redirect is ${default_redirect} with code ${default_redirect_code}`)

console.log('Loaded redirects from environment')

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url)

    const hostname = url.hostname
    const path = url.pathname

    const redirect = redirects.find((r) => r.from === hostname)

    if (redirect) {
      const redirect_url = redirect.to + (redirect.keep_path ? path : '')

      if (parseEnvBool('DEBUG', false)) {
        console.log(`redirecting ${hostname} to ${redirect_url} with code ${redirect.code}`)
      }
      
      return Response.redirect(redirect_url, Number(redirect.code))
    }

    return Response.redirect(default_redirect, default_redirect_code)
  },
  error(error) {
    console.log(error)
    return new Response('An error occurred!', { status: 500 })
  },
})

console.log(`Server running at ${server.url}`)

process.on("exit", () => {
  console.log(`Shutting down server...`)
  server.stop()
})