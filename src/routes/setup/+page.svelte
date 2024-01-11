<script>
    import { subscribeData } from "$lib/firebase"
    import { onMount } from "svelte";
    import ClassMenu from "./ClassMenu.svelte";

    let name, major

    let menu_wrapper
    function openMenuWrapper() {
        menu_wrapper.style.display = "block"
    }
    function closeMenuWrapper() {
        menu_wrapper.style.display = "none"
    }

    let classes = []
    onMount(() => {
        subscribeData("classes", data => {
            classes = data
            console.log(classes)
        })
    })
</script>

<!--  -->

<div class="page">
    <section>
        <h2>Personal Info</h2>
        <div class="grid list">
            <div class="label">Name</div>
            <input type="text" placeholder="What is your name?" bind:this={name}>

            <div class="label">Major</div>
            <input type="text" placeholder="What is your major?" bind:this={major}>
        </div>
    </section>

    <section>
        <h2>Your Classes</h2>
        <div class="grid">
            <!-- {#each classes as item}
                <button>
                    {item}
                </button>
            {/each} -->
            <button class="item icon" on:click={openMenuWrapper}>
                <i class="fa-solid fa-plus"></i>
                <div class="data">
                    <div class="title">Add Class</div>
                </div>
            </button>
        </div>
    </section>

    <section>
        
    </section>
</div>

<div class="class-menu-wrapper" bind:this={menu_wrapper}>
    <button class="class-menu-backdrop" on:click={closeMenuWrapper}></button>
    <div class="class-menu">
        <ClassMenu />
    </div>
</div>


<!--  -->

<style>
    .class-menu-wrapper{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
        display: none;
    }

    .class-menu-backdrop{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--contrast-transparent);
        backdrop-filter: blur(4pt);
        -webkit-backdrop-filter: blur(4pt);
    }

    .class-menu{
        position: absolute;
        top: 0;
        left: 50vw;
        translate: -50% 0;
    }
</style>