import { json } from '@sveltejs/kit';
import { GITHUB_TOKEN } from '$app/env/private';

// pinned repos are only exposed through the GraphQL API, which needs a token
const query = `{
    user(login: "possiblyselena") {
        pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
                ... on Repository {
                    nameWithOwner
                    description
                    url
                }
            }
        }
    }
}`;

export async function GET() {
    if (!GITHUB_TOKEN) {
        return json([]);
    }

    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    if (!res.ok) {
        console.error('github error', res.status, await res.text());
        return json([]);
    }

    const { data } = await res.json();
    return json(
        data.user.pinnedItems.nodes.map(({ nameWithOwner, description, url }) => ({
            name: nameWithOwner,
            description,
            url
        }))
    );
}
