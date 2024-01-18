<script>
    import { writeData, subscribeData } from "$lib/firebase"
    import ClassMenu from "./ClassMenu.svelte"

    let menu_wrapper
    let days = ["Mon","Tues","Wed","Thurs","Fri"]
    days = ["M","T","W","Th","F"]

    $: class_ids = []
    $: classes = []
    subscribeData("classes", data => {
        class_ids = Object.keys(data)
        classes = Object.values(data)
    })

    let editing_item = null
    function createClass() {
        editing_item = null
        openMenu()
    }
    function editClass(item) {
        editing_item = item
        item.uid = class_ids[classes.indexOf(item)]
        openMenu()
    }
    function openMenu() {
        menu_wrapper.style.display = "block"
    }

    function convertToPrettyTime(time24hr) {
        const [hours, minutes] = time24hr.split(':')
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10)
        const period = hour >= 12 ? 'PM' : 'AM'
        const prettyHour = hour % 12 === 0 ? 12 : hour % 12
        const prettyMinute = minute < 10 ? `0${minute}` : minute
        return `${prettyHour}:${prettyMinute} ${period}`
    }

    function createAgenda() {
        writeData("setup_complete", true, () => window.open("/home-view", "_self"))
    }
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
                        <div class="title">{item.class_name}</div>
                        <div class="status">{convertToPrettyTime(item.time_start)} - {convertToPrettyTime(item.time_end)}</div>
                        <div class="status">
                            {#each item.days as day, i}
                                {day ? days[i] + " " : ""}
                            {/each}
                        </div>
                        <div class="status"> {item.credit_hours} hours</div>
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
        <ClassMenu item={editing_item} />
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
        width: fit-content;
        position: fixed;
        top: 2rem;
        left: 50vw;
        translate: -50% 0;
        overflow: auto;
        border-radius: 0.5rem;
    }
</style>