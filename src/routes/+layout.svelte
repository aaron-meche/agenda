<script>
    import "$lib/main.css"
    import "$lib/style.css"
    import "$lib/firebase"
    import Header from "./Header.svelte";
    import { db } from "$lib/data"
    import { beforeUpdate, onMount } from "svelte"
    import { subscribeData } from "$lib/firebase"

    let app
    let is_logged_in = false
    db.subscribe(data => {
        is_logged_in = data.is_logged_in
    })
    onMount(() => {
        if (is_logged_in) {
            subscribeData("", data => {
                app.style.opacity = 1
            })
        }
        else {
            app.style.opacity = 1
        }
    })
</script>

<!--  -->

<!-- <img class="wallpaper" src="wallpaper.jpg" alt="wallpaper"> -->
<!-- <div class="wallpaper-cover"></div> -->

<div class="app" bind:this={app}>
    <div class="head">
        <Header />

        <!-- <div class="horizontal-scroll">
            <button on:click={logout}>sample set</button>
            <button on:click={logout}>logout</button>
        </div> -->
    </div>

    <div class="body">
        <slot />
    </div>
</div>

<!--  -->

<style>
    .app{
        opacity: 0.5;
        transition: opacity 500ms;
    }

    .head{
        position: sticky;
        top: 0;
        background: var(--bg-transparent);
        backdrop-filter: blur(16pt);
        -webkit-backdrop-filter: blur(16pt);
        z-index: 2;
    }

    .horizontal-scroll{
        padding-block: 0.5rem;
    }
    
    button{
        padding: 0.5rem 1rem;
        margin-right: 0.5rem;
        background: var(--l1);
        border-radius: 0.5rem;
    }

    button:hover{
        background: var(--l2);
        border-color: var(--l4);
    }

    .wallpaper{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -10;
        object-fit: cover;
    }

    .wallpaper-cover{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -9;
        backdrop-filter: blur(32pt);
        -webkit-backdrop-filter: blur(32pt);
    }
</style>