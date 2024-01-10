<script>
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { db } from "$lib/data"


</script>

<!--  -->

<div class="wrapper">
    <div>
        Aaron Meche
    </div>

    <div class="right" style="margin-left: auto">
        January 8, 2023
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
</style>