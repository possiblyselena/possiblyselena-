import { defineEnvVars } from '@sveltejs/kit/env'

// optional, so the rest of the site still runs before these are filled in
const optional = { schema: (value) => value }

export const variables = defineEnvVars({
    SPOTIFY_CLIENT_ID: optional,
    SPOTIFY_CLIENT_SECRET: optional,
    SPOTIFY_REFRESH_TOKEN: optional,
    GITHUB_TOKEN: optional
})
