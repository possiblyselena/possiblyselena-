<script>
    import { onMount } from 'svelte';
    import Navbar from '../components/navbar.svelte';
    import Footbar from '../components/footbar.svelte';

    const maxCommitsToDisplay = 3;
    let commits = $state([]);
    let pinnedRepos = $state([]);

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

    async function getPinnedRepos() {
        try {
            const response = await fetch('/api/pinned');
            if (!response.ok) throw new Error('Failed to fetch pinned repos');

            pinnedRepos = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        getRecentCommits();
        getPinnedRepos();
    });
</script>
<div class="mx-2">
    <h1 class="font-amoria text-7xl">Things I'm building</h1>
</div>
<div class="flex m-2 gap-10 ">
    <div>
    <h2 class="font-creato text-2xl font-bold">Recent Commits</h2>
        <ul class="font-creato">
            {#each commits as commit}
                <li class=my-2>
                    <strong>{commit.date}</strong> [<em>{commit.repoName}</em>]:
                    <a class="font-creato text-1rem" href={commit.url} target="_blank">{commit.message}</a>
                </li>
            {/each}
        </ul>
    </div>
    <div>
        <h2 class="font-creato text-2xl font-bold ">I have many repos but these are the better ones.</h2>
        <ul>
            {#each pinnedRepos as repo}
                <li class="font-creato">
                    <a class="font-creato text-1rem" href={repo.url} target="_blank">{repo.name}</a>
                    {#if repo.description} - {repo.description}{/if}
                </li>
            {/each}
        </ul>
    </div>
</div>

<div class="font-creato">
    <h2 class="text-3xl">I use this?</h2>
    <div class="flex flex-wrap gap-4 my-4">
        <div>
            <h1 class="font-bold">Front-End</h1>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Svelte</li>
            <li>React</li>
        </div>
        <div>
            <h1 class="font-bold">Back-End</h1>
            <li>SvelteKit</li>
            <li>Convex</li>
            <li>Couch DB</li>
        </div>
        <div>
            <h1 class="font-bold">Art & Design</h1>
            <li>Figma</li>
            <li>Solidworks/Onshape</li>
        </div>
        <div>
            <h1 class="font-bold">Other Stuff</h1>
            <li>Git</li>
            <li>GitHub</li>
            <li>Godot</li>
        </div>
    </div>
</div>

<div>
    <h1 class="font-amoria text-7xl m-2">What I want to build</h1>
    <div class="font-creato mx-4">
        <p class="text-2xl">Right now I'm really into...</p>
        <p>Games with Godot</p>
        <p>Funky Websites</p>
        <p>Tiny hardware gadgets</p>
    </div>
</div>