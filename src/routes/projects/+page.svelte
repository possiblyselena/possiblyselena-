<script>
    import { onMount } from 'svelte';

    const maxCommitsToDisplay = 5;
    let commits = $state([]);
    async function getRecentCommits() {
        const url = `https://api.github.com/users/possiblyselena/events/public`


        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch recent commits');

            const events = await response.json();
            const pushes = events
                .filter(event => event.type === 'PushEvent')
                .slice(0, maxCommitsToDisplay);

            commits = await Promise.all(
                pushes.map(async (event) => {
                    const repoName = event.repo.name;
                    const sha = event.payload.head;
                    const res = await fetch(`https://api.github.com/repos/${repoName}/commits/${sha}`);
                    const data = res.ok ? await res.json() : null;
                    return {
                        date : new Date(event.created_at).toLocaleDateString(),
                        repoName,
                        message: data?.commit?.message.split('\n')[0] ?? sha.slice(0,7),
                        url: `https://github.com/${repoName}/commit/${sha}`
                    }
                })
            )    
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        getRecentCommits();
    });
</script>

<p>This page displays more of what I've built, or should automatically show the starred stuff on my github</p>
<p>Recent Commits</p>
<ul>
    {#each commits as commit}
        <li>
            <strong>{commit.date}</strong> [<em>{commit.repoName}</em>]:
            <a href={commit.url} target="_blank">{commit.message}</a>
        </li>
    {/each}
</ul>