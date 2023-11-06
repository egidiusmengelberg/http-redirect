import parseEnv from "./parseEnv"

console.log('Starting http-redirect')

const redirects = parseEnv()

console.log('Loaded redirects from environment')

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url)

    const hostname = url.hostname
    const path = url.pathname

    const redirect = redirects.find((e) => e.from === hostname)

    if (redirect) {
      const redirect_url = redirect.to + (redirect.keep_path ? path : '')
      console.log(`redirecting ${hostname} to ${redirect_url} with code ${redirect.code}`)
      return Response.redirect(redirect_url, Number(redirect.code))
    }

    return Response.redirect(
      Bun.env.DEFAULT_REDIRECT_URL ?? 'https://google.com',
      Number(Bun.env.DEFAULT_REDIRECT_CODE) ?? 302,
    )
  },
  error(error) {
    return new Response('An error occurred!' + error.message)
  },
})

console.log(`Server running at port ${server.port}`)