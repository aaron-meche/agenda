<script>
    import { subscribeData } from "$lib/firebase"
    import { onMount } from "svelte";
    import ClassMenu from "./ClassMenu.svelte";

    let menu_wrapper
    let menu_title
    let confirmation_text = ""
    let active_icon = 0
    let class_name = ""
    let credit_hours = 0
    function createClass() {
        menu_title = "Create a Class"
        confirmation_text = "Create Class"
        active_icon = 0
        class_name = ""
        credit_hours = 0
        openMenu()
    }
    function editClass(item) {
        menu_title = "Edit Class"
        confirmation_text = "Update Class"
        active_icon = item.icon
        class_name = item.class_name
        credit_hours = item.credit_hours
        openMenu()
    }
    function openMenu() {
        menu_wrapper.style.display = "block"
    }

    let classes = []
    subscribeData("classes", data => {
        classes = Object.values(data)
        console.log(classes)
    });

</script>

<!--  -->

<div class="page">
    <h1>Create your Profile</h1>

    <section>
        <h2>Your Classes</h2>
        <div class="grid">
            {#each classes as item}
                <button class="item icon" on:click={() => editClass(item)}>
                    <i class="{item.icon}"></i>
                    <div class="data">
                        {item.class_name}
                        <div class="status">{item.credit_hours}.0 credit hours</div>
                    </div>
                </button>
            {/each}
            <button class="item icon" on:click={createClass}>
                <i class="fa-solid fa-plus"></i>
                <div class="data">
                    <div class="title">Add Class</div>
                </div>
            </button>
        </div>
    </section>

    <section>
        <div class="grid list default">
            <button class="item confirm menu-button">Create Agenda</button>
        </div>
    </section>
</div>

<div class="class-menu-wrapper" bind:this={menu_wrapper}>
    <!-- <button class="class-menu-backdrop" on:click={closeMenuWrapper}></button> -->
    <div class="class-menu-backdrop"></div>
    <div class="class-menu">
        <ClassMenu 
            menu_title={menu_title}
            confirmation_text={confirmation_text}
            active_icon={active_icon} 
            class_name={class_name} 
            credit_hours={credit_hours} 
        />
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
        height: calc(100% - 4rem);
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rem 0;
        overflow: auto;
    }
</style>