<script>
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { db } from "$lib/data"

    let is_logged_in, uid, name
    db.subscribe(data => {
        is_logged_in = data.is_logged_in
        uid = data.uid
        name = data.name
    })
</script>

<!--  -->

<div class="wrapper">
    <div class="logo">
        <i class="fa-regular fa-calendar-days"></i>
        Agenda
    </div>

    <div class="right" style="margin-left: auto">
        {#if is_logged_in}
            {name}
        {:else}
            
        {/if}
    </div>
</div>


<!--  -->

<style>
    .wrapper{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        gap: 1rem;
        padding: 1rem calc(var(--inline-moat) + 1rem);
        border-bottom: solid 1pt var(--l3);
        font-size: 16pt;
        font-weight: 600;
    }

    .logo{
        color: var(--accent);
    }

    .logo i{
        margin-right: 0.5rem;
    }
</style>