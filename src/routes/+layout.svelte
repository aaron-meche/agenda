<script>
    import "$lib/main.css"
    import "$lib/style.css"
    import Header from "./Header.svelte";
    import { db } from "$lib/data"
    import { beforeUpdate, onMount } from "svelte";

    beforeUpdate(() => {
        // db.subscribe(data => {
        //     document.documentElement.style.setProperty("--hue", data.hue)
        // })
    })
</script>

<!--  -->

<!-- <img class="wallpaper" src="wallpaper.jpg" alt="wallpaper"> -->
<!-- <div class="wallpaper-cover"></div> -->

<div class="app">
    <div class="head">
        <Header />
    </div>

    <div class="body">
        <slot />
    </div>
</div>

<!--  -->

<style>
    .head{
        position: sticky;
        top: 0;
        background: var(--bg-transparent);
        backdrop-filter: blur(16pt);
        -webkit-backdrop-filter: blur(16pt);
        z-index: 2;
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