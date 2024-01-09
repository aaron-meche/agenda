<script>
    import { db } from "$lib/data"

    let classes
    db.subscribe(data => {
        classes = data.classes
    })
</script>

<!--  -->

<div class="page">
    <section>
        <h2>Your Classes</h2>
        <div class="list">
            {#each classes as item}
                <button class="icon item">
                    <div class="icon">
                        <i class="fa-solid fa-{item.icon} fa-lg" style="color: hsl({item.hue}, 48%, 48%)"></i>
                    </div>
                    
                    <div class="data">
                        <div class="title">{item.name}</div>
                        <div class="status"><i class="fa-solid fa-thumbs-up"></i> 0 things left to do</div>
                    </div>
                </button>
            {/each}
        </div>
    </section>
</div>

<!--  -->

<style>
    
</style>