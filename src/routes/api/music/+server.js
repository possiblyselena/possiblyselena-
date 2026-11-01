import { json } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from '$app/env/private';

// access tokens expire after an hour, so trade the refresh token for a new one each time
async function getAccessToken() {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN
        })
    });
    const data = await res.json();
    return data.access_token;
}

export async function GET() {
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        return json([]);
    }

    const token = await getAccessToken();
    const res = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        console.error('spotify error', res.status, await res.text());
        return json([]);
    }

    const data = await res.json();
    return json(
        data.items.map(({ name, artists, external_urls }) => ({
            name,
            artists: artists.map((artist) => artist.name).join(', '),
            url: external_urls.spotify
        }))
    );
}
