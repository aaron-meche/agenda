import { writable } from 'svelte/store'
import { storage } from '$lib/index'

let initial_db = {
    is_logged_in: false,
    uid: null,
    name: null,
}

const app_title = "agenda 1"
const storage_ref = `localStore-${app_title}`

export const localStore = storage.exists(storage_ref) ? writable(JSON.parse(storage.read(storage_ref))) : writable(initial_db)

localStore.subscribe(db => {
    let data
    
    if (JSON.stringify(db) == undefined) {
        data = initial_db
        alert("Corrupt Data")
        if (typeof window !== "undefined") window.open("/", "_self")
    }
    else {
        data = JSON.stringify(db)
    }

    storage.write(storage_ref, data)
})