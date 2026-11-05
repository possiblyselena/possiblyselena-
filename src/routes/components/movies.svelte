<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let movies = $state([]);

    onMount(async () => {
        movies = await (await fetch('/api/movies')).json();
    });

</script>

<div class="grid ">
    <p class="text-lg font-creato" in:fade>What I've been watching...</p>
    {#each movies as movie}
        <a class="text-sm" in:fade href="https://letterboxd.com/possiblyselena/">{movie.title} rated {movie.memberRating}/5 on {movie.watchedDate}</a>
    {/each}
</div>

<style>
    a { 
        font-family: creato;
    }
</style>