<script>
    import Commit from "./commit.svelte";
    import Friends from '#lib/friends.json';
</script>

<div>
    <div class="flex gap-4 font-creato text-2xl px-5">
        {#each Friends as friend}
            <a href={friend.url} target="_blank">
                <img src={friend.button} alt={friend.name} class="h-10" />
            </a>
        {/each}
    </div>
</div>
<div class="flex gap-20 font-creato text-2xl px-5">
    <Commit />
    <a href="https://www.linkedin.com/in/selena-nguyen-0b7287321/" target="_blank">Linkedin</a>
    <a href="https://github.com/possiblyselena" target="_blank">Github</a>
    <a href="mailto:selena@hackclub.com" target="_blank">Email</a>
</div>
