<script>
    import { localStore } from "$lib/data"
    import { onMount } from "svelte";

    let active_class = {}

    onMount(() => {
        localStore.subscribe(data => {
            let classes = data.classes
            active_class = classes.find(item => item.id == data.active_class_id)
            console.log(active_class)
        })
    })
</script>

<!--  -->

<div class="title-bar horizontal-scroll">
    <a class="button" href="/">
        <i class="fa-solid fa-arrow-left"></i>
        Back
    </a>
</div>

<div class="page block-delete">
    <div class="head">
        <div class="class-label">{active_class.label}</div>
        <div class="class-name">{active_class.name}</div>
    </div>

    <section>
        <h2>Upcoming Assignments</h2>
        <div class="grid list">
            <div class="item">
                <div class="title">Midterm</div>
                <div class="status">January 13 (4 days)</div>
            </div>
            <div class="item">
                <div class="title">Final</div>
                <div class="status">April 13 (3 months)</div>
            </div>
        </div>
    </section>
</div>


<!--  -->

<style>
    .head{
        padding: 0 1rem;
    }

    .class-label{
        font-size: 24pt;
        font-weight: 600;
    }

    .class-name{
        font-size: 16pt;
        font-weight: 500;
        opacity: 0.5;
    }
</style>