<script>
    import { onMount } from "svelte";

    let commitData = $state(/** @type {any} */ (null));

    async function getCommit() {
        try {
            const response = await fetch("https://api.github.com/repos/possiblyselena/possiblyselena/commits/");
            commitData = (await response.json())[0];
        } catch (error) {
        commitData = {
                sha: "n/a",
        };
        console.log("fetch failed: " + error);
        }
    }

    onMount(() => {
        getCommit();
    });
</script>

<div>
    commit <a href="https://github.com/possiblyselena/possiblyselena/commit/{commitData?.sha}" target="_blank">{commitData?.sha ? commitData.sha.slice(0, 7) : "ratelimited :("}</a>
    ! last updated: {
        commitData?.commit
            ? new Date(commitData.commit.author.date).toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                },
            ) + " UTC"
        : "n/a"
    }
</div>
