<script>
    import artwork from '#lib/gallery.json';
</script>

<div>
    {#each artwork as art}
        <div class="flex flex-col items-center gap-2">
            <img src={art.image} alt={art.name} class="w-40" />
            <p class="font-creato text-lg">{art.name}</p>
            <p class="font-creato text-sm">{art.description}</p>
        </div>
    {/each}
</div>
