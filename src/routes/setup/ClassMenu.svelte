<script>
    import { writeData } from "$lib/firebase"

    let menu
    let class_name
    let credit_hours = 0
    const min = 1;
    const max = 10;
    
    function validateInput(event) {
        const value = parseInt(event.target.value);
        if (value < min || value > max) {
            number = min; // Reset to minimum if out of range
        }
    }

    let active_icon = 0;
    let icons = [
        "fa-solid fa-calculator", // math
        "fa-solid fa-book", // english
        "fa-solid fa-pen", // writing
        "fa-solid fa-flask", // science
        "fa-solid fa-dna", // biology
        "fa-solid fa-brain", // psychology
        "fa-solid fa-mountain", // geology
        "fa-solid fa-landmark", // government
    ]

    function selectIcon(index) {
        active_icon = index
    }
    
    function createClass() {
        writeData("classes/" + class_name + "/credit-hours", credit_hours)
        writeData("classes/" + class_name + "/icon", icons[active_icon])
        closeMenu()
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
        <h1>Create a Class</h1>
        <div class="grid list">
            <div class="label">Icon</div>
            <div class="horizontal-scroll default">
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

            <button class="confirm form-button" on:click={createClass}>Create Class</button>
            <button class="form-button" on:click={closeMenu}>Cancel</button>
        </div>
    </section>
</div>

<!--  -->

<style>
    .menu{
        width: calc(100vw - (2 * var(--inline-moat)));
        padding: 1rem;
        margin: 1rem auto;
        background: var(--bg);
        border-radius: 0.5rem;
    }

    .horizontal-scroll{
        padding: 0 0.5rem;
    }
    .horizontal-scroll button{
        padding: 1rem;
        border-radius: 0.5rem;
    }
    .horizontal-scroll button:hover{
        background: var(--l2);
    }
    .horizontal-scroll button.active{
        background: var(--l3);
    }
</style>