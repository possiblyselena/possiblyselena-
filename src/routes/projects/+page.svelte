<script>
    import { onMount } from 'svelte';
    import Navbar from '../components/navbar.svelte';
    import Footbar from '../components/footbar.svelte';

    const maxCommitsToDisplay = 5;
    let commits = $state([]);
    let starredRepos = $state([]);

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

    async function getStarredRepos() {
        const url = `https://api.github.com/users/possiblyselena/starred`
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch starred repos');

            const repos = await response.json();
            // You can store the starred repos in a state variable if needed
            starredRepos = repos;
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        getRecentCommits();
        getStarredRepos();
    });
</script>

<p>This page displays more of what I've built, or should automatically show the starred stuff on my github</p>

<h2 class="font-creato text-5xl ">Recent Commits</h2>
<ul>
    {#each commits as commit}
        <li>
            <strong>{commit.date}</strong> [<em>{commit.repoName}</em>]:
            <a class="font-creato text-1rem" href={commit.url} target="_blank">{commit.message}</a>
        </li>
    {/each}
</ul>

<div>
    <h2>I use this?</h2>
    <div class="flex flex-wrap gap-4">
        <div>
            <h1>Front-End</h1>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Svelte</li>
            <li>React</li>
        </div>
        <div>
            <h1>Back-End</h1>
            <li>SvelteKit</li>
            <li>Convex</li>
        </div>
        <div>
            <h1>Art & Design</h1>
            <li>Figma</li>
        </div>
        <div>
            <h1>Other Stuff</h1>
            <li>Git</li>
            <li>GitHub</li>
        </div>
    </div>

    <h2 class="font-creato text-5xl ">My Favourite Repos that aren't my own</h2>
    <ul>
        {#each starredRepos as repo}
            <li>
                <a class="font-creato text-1rem" href={repo.html_url} target="_blank">{repo.full_name}</a>
            </li>
        {/each}
    </ul>
    
  
</div>