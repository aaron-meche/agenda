<script>
    export let menu_title = ""
    export let confirmation_text = ""
    export let active_icon = 0
    export let class_name = ""
    export let credit_hours = 0
    import { generateUID } from "$lib/index"
    import { writeData, deleteData } from "$lib/firebase"

    let menu

    const min = 1;
    const max = 10;
    function validateInput(event) {
        const value = parseInt(event.target.value);
        if (value < min || value > max) {
            credit_hours = min; // Reset to minimum if out of range
        }
    }

    $: if (isNaN(active_icon)) {
        active_icon = icons.indexOf(active_icon)
    }

    let icons = [
        "fa-solid fa-calculator", // math
        "fa-solid fa-laptop-code", // compsci
        "fa-solid fa-book", // english
        "fa-solid fa-pen", // writing
        "fa-solid fa-flask", // science
        "fa-solid fa-dna", // biology
        "fa-solid fa-brain", // psychology
        "fa-solid fa-mountain", // geology
        "fa-solid fa-landmark", // government
        "fa-solid fa-heart", // icon, heart
        "fa-solid fa-star", // icon, star
        "fa-solid fa-diamond", // icon, diamond
    ]

    let days = ["M", "T", "W", "Th", "F"]
    let day_map = [0, 0, 0, 0, 0]

    function selectIcon(index) {
        active_icon = index
    }
    
    function createClass() {
        let ref = "classes/" + generateUID()
        writeData(ref + "/class_name", class_name)
        writeData(ref + "/credit_hours", credit_hours)
        writeData(ref + "/icon", icons[active_icon])
        writeData(ref + "/days", day_map)
        closeMenu()
    }

    function deleteClass() {
        deleteData(ref, closeMenu)
    }

    function closeMenu() {
        menu.parentElement.parentElement.style.display = "none"
        active_icon = 0
        class_name = ""
        credit_hours = 0
    }
</script>

<!--  -->

<div class="menu page" bind:this={menu}>
    <section>
        <h1>{menu_title}</h1>
        <div class="grid list">
            <div class="label">Icon</div>
            <div class="horizontal-scroll selector">
                {#each icons as icon, i}
                    <button class="option {active_icon == i ? "active" : ""}" on:click={() => selectIcon(i)}>
                        <i class="{icon} {active_icon == i ? "active" : ""} fa-lg"></i>
                    </button>
                {/each}
            </div>

            <div class="label">Class Name</div>
            <input type="text" bind:value={class_name}>
    
            <div class="label">Credit Hours</div>
            <input type="number" bind:value={credit_hours} min={min} max={max} on:keyup={validateInput}>

            <div class="label">Days</div>
            <div class="horizontal-scroll selector">
                {#each days as day, i}
                    <button class="item">{day}</button>
                {/each}
            </div>
        </div>
    </section>
        
    <section>
        <div class="grid list default">
            <button class="item confirm menu-button" on:click={createClass}>{confirmation_text}</button>
            <button class="item delete menu-button" on:click={deleteClass}>Delete Class</button>
            <button class="item menu-button" on:click={closeMenu}>Cancel</button>
        </div>
    </section>
</div>

<!--  -->

<style>
    .menu{
        width: calc(100vw - (2 * var(--inline-moat)));
        padding: 2rem;
        margin: 0 auto;
        background: var(--bg);
        border-radius: 0.5rem;
        overflow: auto;
    }
</style>