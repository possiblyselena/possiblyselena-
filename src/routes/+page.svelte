<script>
    import Navbar from './components/navbar.svelte';
    import Footbar from './components/footbar.svelte';
    import Polaroid from './components/polaroid.svelte';
</script>

<Navbar />

<div class="flex flex-col items-center my-10">
    <h2 class="font-amoria text-7xl">Hello, I'm Selena!</h2>
    <Polaroid />
    <h2 class="font-amoria text-5xl"    >I currently work on events & programs at Hack Club!</h2>
</div>
<Footbar />


<style>

</style>