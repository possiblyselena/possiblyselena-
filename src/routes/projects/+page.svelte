<script>
    import { fade } from 'svelte/transition';
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
<div class="flex m-4 gap-10">
    <div>
    <h2 class="font-creato text-4xl font-bold my-2">Recent Commits</h2>
        <ul class="font-creato ">
            {#each commits as commit}
                <li class="font-creato text-lg" in:fade>
                    <strong>{commit.date}</strong> [<em>{commit.repoName}</em>]:
                    <a class="font-creato text-1rem" href={commit.url} target="_blank">{commit.message}</a>
                </li>
            {/each}
        </ul>
    </div>
    <div>
        <h2 class="font-creato text-4xl font-bold my-2" in:fade>I have many repos but these are the better ones.</h2>
        <ul in:fade >
            {#each pinnedRepos as repo}
                <li class="font-creato text-lg" in:fade>
                    <a class="font-creato text-1rem" href={repo.url} target="_blank">{repo.name}</a>
                    {#if repo.description} - {repo.description}{/if}
                </li>
            {/each}
        </ul>
    </div>
</div>

<div>
    <h1 class="font-amoria text-7xl m-2">What I want to build</h1>
    <div class="font-creato m-4 my-5">
        <p class="text-3xl">Right now I'm really into...</p>
        <div class="flex flex-col gap-4">
            <div class="my-2">
                <h2 class="font-creato text-2xl font-bold">Mini Games with Godot</h2>
                <p>See my submissions for <a href="https://jamegam.hackclub.com/">Jame Gam</a> on my <a href="https://possiblyselena.itch.io/">Itch.io</a></p>
            </div>
            <div>
                <h2 class="font-creato text-2xl font-bold">Funky Websites</h2>
                <p>I've ran a program called <a href="https://urspace.hackclub.com/">Urspace!</a></p>
            </div>
            <div>
                <h2 class="font-creato text-2xl font-bold">Tiny hardware gadgets</h2>
                <p>I built <a href="https://daisychain-five.vercel.app/">Daisy Chain</a> for <a href="https://devpost.com/software/daisy-chain">Calhacks 13.0</a></p>
            </div>

        </div>

    </div>
</div>