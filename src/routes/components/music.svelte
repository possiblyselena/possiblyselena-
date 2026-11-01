<script>
    import { onMount } from 'svelte';

    let tracks = $state([]);

    onMount(async () => {
        tracks = await (await fetch('/api/music')).json();
    });
</script>

<div class="grid ">
    <p class="text-lg font-creato">What I've been listening to...</p>
    {#each tracks as track}
        <a class="text-sm" href={track.url}>{track.name} by {track.artists}</a>
    {/each}
</div>

<style>
    a {
        font-family: creato;
    }
</style>
