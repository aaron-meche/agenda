<script>
    import { db } from "$lib/data"

    let classes
    db.subscribe(data => {
        classes = data.classes
    })

    function openClass(id) {
        db.update(data => {
            data.active_class_id = id
            return data
        })
    }
</script>

<!--  -->

<div class="grid">
    {#each classes as item}
        <a href="/class-view" on:click={() => openClass(item.id)} class="icon item">
            <div class="icon">
                <i class="fa-solid fa-{item.icon} fa-xl" style="color: hsl({item.hue}, 48%, 48%)"></i>
            </div>
            
            <div class="data">
                <div class="title">{item.label}</div>
                <div class="status">{item.name}</div>
                <div class="status"><i class="fa-solid fa-thumbs-up"></i> 0 things left to do</div>
            </div>
        </a>
    {/each}
</div>

<!--  -->

<style>

</style>