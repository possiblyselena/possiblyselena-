<script>
    import Polaroid from './components/polaroid.svelte';
    import Music from './components/music.svelte';
    import Movies from './components/movies.svelte';
</script>


<div class="flex flex-col items-center my-10">
    <h2 class="font-amoria text-7xl">Hello, I'm Selena!</h2>

    <Polaroid />
    <div class="fixed left-30 top-40">
        <Music />
    </div>
    <div class="fixed right-30 top-120">
        <Movies />
    </div>
    <h2 class="font-amoria text-5xl my-4">I currently work on events & programs at Hack Club</h2>
</div>

<style>

</style>