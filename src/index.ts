import parseEnv from "./parseEnv"

console.log('Starting http-redirect')

const redirects = parseEnv()

const default_redirect = Bun.env.DEFAULT_REDIRECT_URL ?? 'https://google.com'
const default_redirect_code = Number(Bun.env.DEFAULT_REDIRECT_CODE) ?? 302

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
      console.log(`redirecting ${hostname} to ${redirect_url} with code ${redirect.code}`)
      return Response.redirect(redirect_url, Number(redirect.code))
    }

    return Response.redirect(default_redirect, default_redirect_code)
  },
  error(error) {
    console.log(error)
    return new Response('An error occurred!', { status: 500 })
  },
})

console.log(`Server running at port ${server.port}`)

process.on("exit", () => {
  console.log(`Shutting down server...`)
  server.stop()
})