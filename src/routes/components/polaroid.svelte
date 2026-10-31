<script>
    import { onMount } from 'svelte';
    import photos from '#lib/photo.json';


    const slides = photos;

    let index = $state(0);
    let current = $derived(slides[index]);
    function next() {
        index = (index + 1) % slides.length;
    }

    onMount(() => {
        const timer = setInterval(next, 1000);
        return () => clearInterval(timer);
    });
</script>

<div class="relative my-8 h-96 w-72 cursor-pointer" aria-label="Next photo">
    {#key index}
        <div
            class="absolute inset-0 bg-white p-3 pb-14 shadow-xl"
        >
        <img src={current.url} alt={current.date} class="w-full h-full object-cover" />
            <p class="font-amoria absolute bottom-3 left-0 right-0 text-center text-2xl text-neutral-700">
                {current.date}
            </p>
        </div>
    {/key}
</div>
