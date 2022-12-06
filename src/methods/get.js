import axios from 'axios';
import { formatDate } from '../methods/convert';

async function get(url) {
    await axios.get(url)
    .then(res => {
        return res
    })
}
export function getNdo(nDate){
    return ((nDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)).toFixed()
    // Flight date - Current date
}

export function getFltTime(fltDate, arrivalTime) {
    let date = new Date(formatDate(fltDate))
    let time = arrivalTime.split(":")
    let timeInMill = date.getTime() + ((Number(time[0]) * 60 + Number(time[1])) * 60 * 1000)
    return timeInMill
}

export function getBrule(name) {
    let brule = JSON.parse(localStorage.getItem(`brule_0`))
    console.log(brule.name, name)

    for (let i = 0; i < localStorage.length; i++) {
        let brule = JSON.parse(localStorage.getItem(`brule_${i}`))
        if (brule && brule.name === name) {
            return brule;
        }
    }
}
// export function getBrule(flt, type = 'brule') {
//     var brule;
//     var brule_flt = localStorage.getItem(`${flt.origIata}-${flt.destIata}-${flt.fltNum}`)
//     if (brule_flt) {
//         brule = JSON.parse(brule_flt)
//     }
//     if (!brule) {
//         brule = JSON.parse(localStorage.getItem("brule"))
//     }
//     if (type === 'name') {
//         return brule.name
//     }
//     return brule.brule
// }

export function getLastAvailableNum(saveName) {
    for (let i=0; i < localStorage.length + 1; i++) {
        if (!localStorage.getItem(`${saveName}_${i}`)) {
            return i
        }
    }
}

export default get