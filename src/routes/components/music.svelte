<script>
    import { onMount } from 'svelte';

    let tracks = $state([]);

    onMount(async () => {
        tracks = await (await fetch('/api/music')).json();
    });
</script>

{#each tracks as track}
    <p>{track.name} by {track.artists}</p>
{/each}
