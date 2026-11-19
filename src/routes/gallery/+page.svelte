<script>
    import artwork from '#lib/gallery.json';

    let hovered = $state(/** @type {any} */ (null));
</script>

<div class="circle relative mx-auto my-10">
    {#each artwork as art, i}
        <img
            src={art.image}
            alt={art.name}
            class="item absolute left-1/2 top-1/2 w-40 transition-[scale] hover:scale-110"
            style:--i={i}
            style:--n={artwork.length}
            onmouseenter={() => (hovered = art)}
            onmouseleave={() => (hovered = null)}
        />
    {/each}

    <div class="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 text-center">
        {#if hovered}
            <p class="font-creato text-4xl">{hovered.name}</p>
            <p class="font-creato text-lg">{hovered.description}</p>
        {:else}
            <p class="font-creato text-4xl">hover over something!</p>
        {/if}
    </div>
</div>

<style>
    .circle {
        --radius-x: 400px;
        --radius-y: 240px;
        width: calc(var(--radius-x) * 2 + 10rem);
        height: calc(var(--radius-y) * 2 + 10rem);
        max-width: 100%;
    }

    /* smaller ring on phones */
    @media (max-width: 640px) {
        .circle {
            --radius-x: 130px;
            --radius-y: 170px;
        }

        .item {
            width: 6rem;
        }
    }

    /* registered so the browser can animate it, a plain custom property would just jump */
    @property --spin {
        syntax: '<angle>';
        inherits: true;
        initial-value: 0deg;
    }

    /* separate x and y radii stretch the circle into an oval. -90deg starts at the top */
    .item {
        --angle: calc(360deg / var(--n) * var(--i) - 90deg + var(--spin));
        translate: calc(cos(var(--angle)) * var(--radius-x) - 50%) calc(sin(var(--angle)) * var(--radius-y) - 50%);
        animation: spin 10s linear infinite;
    }

    @keyframes spin {
        to {
            --spin: 360deg;
        }
    }

    /* keep it still for people who have reduced motion turned on */
    @media (prefers-reduced-motion: reduce) {
        .item {
            animation: none;
        }
    }
</style>
