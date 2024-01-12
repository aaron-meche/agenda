// Local storage data access
export const storage = {
    read: function (location) {
        if (typeof window =="undefined") return

        if (storage.exists(location)) {
            return localStorage[location]
        } else {
            return ''
        }


    },

    write: function (location, value) {
        if (typeof window =="undefined") return

        localStorage[location] = value
    },

    clear: function() {
        if (typeof window =="undefined") return

        localStorage.clear()
    },

    exists: function (location) {
		if (typeof window =="undefined") return

        if (localStorage[location]) return true
		else return false
	}
}

// Shuffle Array
export function shuffle(array) {
    let length = array.length
    let canvas = array

    const genRanNum = (max_num) => {
        return Math.floor(Math.random() * max_num)
    }

    for (let i = 0; i < length; i++) {
        let rannum = genRanNum(length),
            currentItem = canvas[i],
            randomItem  = canvas[rannum]

        if (currentItem == randomItem) continue

        canvas[i] = randomItem
        canvas[rannum] = currentItem
    }

    return canvas
}

// Random ID Generator
export function generateUID() {
    let characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let uid = ""
    uid += Math.floor(Math.random() * 1_000_000_000_000)
    uid += "-"
    for (let i = 0; i < 12; i++) {
        let ran_num = Math.floor(Math.random() * 26)
        uid += characters[ran_num]
    }
    return uid
}