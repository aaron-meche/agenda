<script>
    import { db } from "$lib/data"
    import { auth } from "$lib/firebase"

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

<div class="page">
    <section>
        <h2>Welcome to your new agenda!</h2>
        
    </section>
</div>

<!--  -->

<style>

</style>