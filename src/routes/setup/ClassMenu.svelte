<script>
    export let item
    import { generateUID } from "$lib/index"
    import { writeData, deleteData } from "$lib/firebase"
    
    let menu
    let menu_title = "Create Class"
    let active_icon = 0
    let class_name = ""
    let credit_hours = 1
    let day_map = [0, 0, 0, 0, 0]
    let time_start = "10:00"
    let time_end = "11:00"
    let class_uid = generateUID()
    
    let previously_stored_item = null
    $: if (item && item !== previously_stored_item) {
        previously_stored_item = item

        menu_title = "Update Class"
        active_icon = icons.indexOf(item.icon)
        class_name = item.class_name
        credit_hours = item.credit_hours
        day_map = [...item.days];
        time_start = item.time_start
        time_end = item.time_end
        class_uid = item.uid
    }

    const min_hours = 1
    const max_hours = 10
    function validateHoursInput(event) {
        const value = parseInt(event.target.value);
        if (value < min_hours || value > max_hours) {
            credit_hours = min_hours; // Reset to minimum if out of range
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

    function selectIcon(index) {
        active_icon = index
    }

    let days = ["M", "T", "W", "Th", "F"]
    $: day_map = [0, 0, 0, 0, 0]

    let hours = [1, 2, 3, 4, 5, 6]
    
    function confirmClass() {
        if (class_name.length < 1) {
            alert("You must name your class")
            return
        }

        let ref = "classes/" + class_uid
        writeData(ref + "/class_name", class_name)
        writeData(ref + "/credit_hours", credit_hours)
        writeData(ref + "/icon", icons[active_icon])
        writeData(ref + "/days", day_map)
        writeData(ref + "/time_start", time_start)
        writeData(ref + "/time_end", time_end)
        closeMenu()
    }

    function deleteClass() {
        let ref = "classes/" + class_uid
        deleteData(ref, closeMenu)
    }

    function closeMenu() {
        previously_stored_item = null
        menu.parentElement.scrollTop = 0
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
                        <i class="{icon} fa-lg"></i>
                    </button>
                {/each}
            </div>

            <div class="label">Class Name</div>
            <input type="text" bind:value={class_name}>
    
            <div class="label">Credit Hours</div>
            <div class="horizontal-scroll selector">
                {#each {length: 6} as _, i}
                    <button class="item {i + 1 == credit_hours ? "active": ""}" on:click={() => credit_hours = i + 1}>{i + 1}</button>
                {/each}
            </div>

            <div class="label">Days</div>
            <div class="horizontal-scroll selector">
                {#each days as day, i}
                    <button class="item {day_map[i] ? "active": ""}" on:click={() => day_map[i] = !day_map[i]}>{day}</button>
                {/each}
            </div>

            <div class="label">Time Start</div>
            <input type="time" bind:value={time_start}>

            <div class="label">Time End</div>
            <input type="time" bind:value={time_end}>
        </div>
    </section>
        
    <section>
        <div class="grid list default">
            <button class="item confirm menu-button" on:click={confirmClass}>{menu_title}</button>
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
        background: var(--bg);
        border-radius: 0.5rem;
    }

    input[type="time"]{
        width: fit-content;
    }
</style>