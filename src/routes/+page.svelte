<script>
    import { db } from "$lib/data"
    import { signInWithGoogle } from "$lib/firebase"

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
    <div class="menu">
        <h2>Welcome to your new Agenda!</h2>
        <div class="grid list">
            <button on:click={signInWithGoogle} class="icon item">
                <i class="fa-brands fa-google"></i>
                <div class="title">Sign in with Google</div>
            </button>
        </div>
    </div>
</div>

<!--  -->

<style>
    .menu{
        padding: 2rem;
        margin: auto;
        background: var(--l1);
        border-radius: 0.5rem;
    }

    .menu h2{
        margin-bottom: 1rem;
    }

    .menu .grid{
        background: var(--l2);
    }

    .menu .grid .item:hover{
        background: var(--l3);
    }
</style>