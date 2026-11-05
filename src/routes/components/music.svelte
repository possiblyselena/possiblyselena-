<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let tracks = $state([]);

    onMount(async () => {
        tracks = await (await fetch('/api/music')).json();
    });
</script>

<div class="grid ">
    <p class="text-lg font-creato" in:fade>What I've been listening to...</p>
    {#each tracks as track}
        <a class="text-sm" in:fade href={track.url}>{track.name} by {track.artists}</a>
    {/each}
</div>

<style>
    a {
        font-family: creato;
    }
</style>
