import { writable } from 'svelte/store'
import { storage } from '$lib/index'

let initial_db = {
    classes: [
        {
            name: "MATH 1551",
            label: "Math",
            icon: "calculator",
            hue: 0,
        },
        {
            name: "CSC 1551",
            label: "Computer Science",
            icon: "laptop-code",
            hue: 230,
        },
        {
            name: "BIOL 1001",
            label: "Biology",
            icon: "dna",
            hue: 180,
        },
        {
            name: "GEOL 1301",
            label: "Geology",
            icon: "mountain",
            hue: 120,
        },
        {
            name: "ART 1001",
            label: "Art",
            icon: "paintbrush",
            hue: 300,
        },
    ]
}

const app_title = "agenda 1/8 4"
const storage_ref = `localDB-${app_title}`

export const db = storage.exists(storage_ref) ? writable(JSON.parse(storage.read(storage_ref))) : writable(initial_db)

db.subscribe(db => {
    let data
    
    if (Object.keys(db) == undefined) {
        data = initial_db
        if (typeof window !== "undefined") window.open("/", "_self")
    }
    else {
        data = JSON.stringify(db)
    }

    storage.write(storage_ref, data)
})