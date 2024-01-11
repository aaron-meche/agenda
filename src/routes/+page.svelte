<script>
    import { localStore } from "$lib/data"
    import { signInWithGoogle, signInAsGuest } from "$lib/firebase"
    import { onMount } from "svelte";

    onMount(() => {
        let user
        localStore.subscribe(data => {
            user = data.uid
            if (user) {
                window.open("/setup", "_self")
            }
        })
    })

    let classes
    localStore.subscribe(data => {
        classes = data.classes
    })

    function openClass(id) {
        localStore.update(data => {
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
            <button on:click={signInAsGuest} class="icon item">
                <i class="fa-solid fa-user"></i>
                <div class="title">Sign in as Guest</div>
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