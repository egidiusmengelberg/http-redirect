export default function() {
    const env = Object.entries(Bun.env).map(([key, value]) => ({ key, value }))

    const redirect_settings = env.filter((e) => e.key.startsWith('REDIRECT_'))
    const redirect_urls = redirect_settings.filter((e) => e.key.endsWith('_URL'))

    const redirects = redirect_urls.map((e) => {
        let from_parts = e.key.split('_')
        from_parts.shift()
        from_parts.pop()

        const from = from_parts.join('.').toLowerCase()
        const to = e.value
        const code = Number(redirect_settings.find((e) => e.key === `REDIRECT_${from_parts.join('_')}_CODE`)?.value) ?? 302
        const keep_path = redirect_settings.find((e) => e.key === `REDIRECT_${from_parts.join('_')}_KEEP_PATH`)?.value === 'true' ?? false

        console.log(`Redirecting ${from} to ${to} with code ${code} and keep_path ${keep_path}`)

        return {
            from,
            to,
            code,
            keep_path,
        }
    })

    return redirects
}