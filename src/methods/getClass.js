import {formatDate} from './convert';
import { getNdo, getBrule } from './get';

const classColors = {
    'W': 'bg-black',
    'S': 'bg-gray-400', 
    'Y': 'bg-red-600', 
    'B': 'bg-red-400', 
    'E': 'bg-orange-600', 
    'G': 'bg-black', 
    'H': 'bg-black', 
    'K': 'bg-yellow-500', 
    'L': 'bg-green-600', 
    'M': 'bg-green-700', 
    'N': 'bg-black', 
    'O': 'bg-black', 
    'Q': 'bg-black', 
    'V': 'bg-black', 
    'X': 'bg-black', 
    'T': 'bg-black', 
    'U': 'bg-black'
}

function getClass(flt, brule){
    var amount = 0
    //console.log(flt)
    flt.tickets.forEach(ticket => {
        amount += ticket.amount
    });
    var congestion = amount > 0 ? amount - 1 : 0
    var nDate = new Date(formatDate(flt.fltDate)) // Дата вылета рейса
    var nDo = getNdo(nDate) // Кол-во дней до вылета
    //console.log(congestion, nDo)
    // var brule = getBrule(flt)

    var counts = Object.keys(brule[0]) // [0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 17, 20, 24, 28, 32, 36, 40, 45, 50, 60, 80, 100, 120, 180, 260]
    var closest = counts.reduce(function(prev, curr) {
        return (Math.abs(curr - nDo) < Math.abs(prev - nDo) ? curr : prev);
    });

    if (congestion >= 100) {
        congestion = 99
    }
    // console.log(congestion, closest)
    const cabin = brule[99-congestion][closest]

    return cabin
}
export function getClassColor(cabin){
    return classColors[cabin]
}
export default getClass