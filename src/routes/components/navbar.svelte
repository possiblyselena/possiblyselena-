<script>
    import { page } from '$app/state'


</script>

<div class="flex gap-90  text-2xl p-5 items-center  ">
   <a href="/" class={page.url.pathname === '/' ? 'underline' : ''}>Home</a>
   <a href="/aboutme" class={page.url.pathname === '/aboutme' ? 'underline' : ''}>About Me</a>
   <a href="/projects" class={page.url.pathname === '/projects' ? 'underline' : ''}>Projects</a>
   <a href="/gallery" class={page.url.pathname === '/gallery' ? 'underline' : ''}>Gallery</a>
</div>

<style>
    a {
        font-family: 'creato';
    }
</style>