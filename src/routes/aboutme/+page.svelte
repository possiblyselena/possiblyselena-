<script>

    const pastInfo = [
        {
            text: "Spent my whole childhood in Hamilton, Ontario",
            images: ["/aboutme/artcrawl.jpg", "/aboutme/bday.JPG", "/aboutme/outside.JPG    "]
        },

        {
            text: "Ran 7 hackathons",
            images: ["/aboutme/daydream.JPG", "/aboutme/capitol.PNG", "/aboutme/hammerhacks.PNG"]
        },

        {
            text: "Built some things that landed me awards and recognition",
            images: ["/aboutme/impact.jpg", "/aboutme/scrapyard.JPG", "/aboutme/undercity.JPG"]
        }
    ]

    const currentInfo = [
        {
            text: "Moved and Living in Vermont at 18",
            images: ["/aboutme/hike.jpg", "/aboutme/fridge.jpg", "/aboutme/pier.jpg"]
        },

        {
            text: "Taking a gap year at Hack Club",
            images: ["/aboutme/movie.PNG", "/aboutme/opensauce.jpg", "/aboutme/calhacks.JPG"]
        },

        {
            text: "Working on personal projects when I have the time",
            images: ["/aboutme/daisychain.jpg", "/aboutme/showtunes.jpg", "/aboutme/jellycat.jpg"]
        }
    ]

    const futureInfo = [
        {
            text: "Starting Computer Engineering @ University of Waterloo Fall 2027",
            images: ["/aboutme/seniorsunset.JPG", "/aboutme/waterloo.JPG", "/aboutme/grad.JPG"]
        },

        {
            text: "I want to make my own art - music, paintings, and clothing",
            images: ["/aboutme/polaris.JPG", "/aboutme/sleepover.PNG", "/aboutme/hackathon3.jpg"]
        },

        {
            text: "Will probably bake cookies this week",
            images: ["/aboutme/coffee.jpg", "/aboutme/order.JPG", "/aboutme/tiramisu.jpg"]
        }
    ]

    let activeBullet = $state({ images: []});

    function setActiveBullet(bullet) {
        activeBullet = bullet;

    }

</script>

<p class="font-amoria text-5xl">What do I even say about myself?</p>

<div class="flex">
    <div class="my-5">
        <div class="past">
            <h2>What I did in the past</h2>
            {#each pastInfo as info}
                <li onmouseenter={() => setActiveBullet(info)}>{info.text}</li>
            {/each}
        </div>

        <div class="current">
            <h2>What I'm doing right now</h2>
            {#each currentInfo as info}
                <li onmouseenter={() => setActiveBullet(info)}>{info.text}</li>
            {/each}
        </div>

        <div class="future">
            <h2>What I'm doing in the future</h2>
            {#each futureInfo as info}
                <li onmouseenter={() => setActiveBullet(info)}>{info.text}</li>
            {/each}
        </div>
    </div>
    <div>
        {#each activeBullet.images as image}
            <img src={image} class="bg-white p-3 shadow-xl" alt="Description of image"/>
        {/each}
    </div>
</div>


<style>

    li {
        font-family: 'creato';
        font-size: 1rem;   
        padding: 1rem; 
    }

    h2 {
        font-family: 'creato';
        font-size: 1.5rem;
    }

    .info {
        padding: 1rem;
        margin: 1rem;
        border: 1px solid #ccc;
    }

    img {
        width: 350px;
        height: 225px;
        object-fit: cover;
    }
</style>

