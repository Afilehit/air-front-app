import { getLastAvailableNum } from './get';

export default function save(currentSaveName, saveListName, value) {
    console.log(currentSaveName, saveListName, value)
    for (let i=0; i < localStorage.length; i++) {
        let save = JSON.parse(localStorage.getItem(`${saveListName}_${i}`))
        console.log(save)
        if (save && save.saveName === currentSaveName) {
            localStorage.setItem(`${saveListName}_${i}`, JSON.stringify(value))
            return
        }
    }
    localStorage.setItem(`${saveListName}_${getLastAvailableNum(saveListName)}`, JSON.stringify(value))
}

export function removeSave(currentSaveName, saveListName) {
    for (let i=0; i < localStorage.length; i++) {
        let save = JSON.parse(localStorage.getItem(`${saveListName}_${i}`))
        if (save && (save.saveName === currentSaveName || save.name === currentSaveName) ) {
            localStorage.removeItem(`${saveListName}_${i}`)
        }
    }
}