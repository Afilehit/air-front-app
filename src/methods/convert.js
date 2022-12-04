import getClass, {getClassColor} from "./getClass";
import { getBrule, getNdo } from "./get";

const weekDays = [
    'Вс',
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб'
];
function convert(data, startDate, endDate, origIatas, destIatas, nDoFrom, nDoTo, bkgFrom, bkgTo, flightNums, days, brule) {
    console.log('converting started...')
    if (nDoFrom === '' || nDoFrom === undefined) { nDoFrom = -10000 }
    if (nDoTo === '' || nDoTo === undefined) { nDoTo = 10000 }
    if (bkgFrom === '') { bkgFrom = 0 }
    if (bkgTo === '') { bkgTo = 100 }

    console.log(startDate, endDate, origIatas, destIatas, nDoFrom, nDoTo, bkgFrom, bkgTo, flightNums, days, brule)

    var newJson = {}
    data.forEach(flight => {
        var currentDate = new Date(formatDate(flight.fltDate)).getTime()

        // console.log(flight.brule, brule)

        // console.log(flight.fltNum, flightNums)
        // console.log(inFltNumsRange(flight.fltNum, flightNums))
        if (!inDateScope(currentDate, startDate, endDate)) {
            return
        }
        if (!inFltNumsRange(flight.fltNum, flightNums)) {
            return
        }
        flight.day = getWeekDay(new Date(formatDate(flight.fltDate)))
        if (!inDays(flight.day, days)) {
            return
        }
        // flight.brule = getBrule(flight, 'name')
        // if (!isBrule(brule, flight.brule)) {
        //     return
        // }
        if (!inAirportScope(origIatas, destIatas, flight.origIata, flight.destIata)) {
            return
        }
        console.log(123)

        flight.nDo = getNdo(new Date(formatDate(flight.fltDate)))
        if (!between(flight.nDo, nDoFrom, nDoTo)) {
            return
        }
        flight.amount = getAmount(flight.tickets)
        if (!between(flight.amount, bkgFrom, bkgTo)) {
            return
        }
        flight.class = getClass(flight)
        if (!newJson[flight.fltDate]) {
            newJson[flight.fltDate] = FlightsOverDate(flight.fltDate)
        }
        flight.classColor = getClassColor(flight.class)
        flight.amountColor = getAmountColor(flight.amount)
        newJson[flight.fltDate].flts.push(flight)
        

        // if (inDateScope(currentDate, startDate, endDate) && 
        //     between(getNdo(new Date(formatDate(flight.fltDate))), nDoFrom, nDoTo) &&
        //     between(getAmount(flight), bkgFrom, bkgTo) &&
        //     inFltNumsRange(flight.fltNum, flightNums) &&
        //     inDays(getWeekDay(new Date(formatDate(flight.fltDate))), days) &&
        //     isBrule(brule, getBrule(flight, 'name')) &&
        //     inAirportScope(origIatas, destIatas, flight.origIata, flight.destIata)) {

        // }
    });
    console.log(Object.values(newJson))
    return newJson
}
function inDateScope(currentDate, startDate, endDate) {
    if (startDate.getTime() - currentDate <= 0 && endDate.getTime() - currentDate >= 0) {
        return true;
    }
}
function inAirportScope(origIatas, destIatas, origIata, destIata) {
    if (origIatas.length === 0 && destIatas.length === 0) {
        return true;
    }
    if (origIatas.length === 0 || (origIatas.length !== 0 && Array.from(origIatas).indexOf(origIata)) !== -1) {
        if (destIatas.length === 0 || (destIatas.length !== 0 && Array.from(destIatas).indexOf(destIata)) !== -1) {
            return true;
        }
    }
}
function inFltNumsRange(currentFltNum, flightNums) {
    if (flightNums.length === 0) {
        return true;
    }
    var flag;
    flightNums.forEach(fltNum => {
        if (fltNum.indexOf('-') > -1) {
            var fltNumRange = fltNum.split("-")
            if (between(currentFltNum, Number(fltNumRange[0]), Number(fltNumRange[1]))) {
                flag = true;
            }
        } else {
            if (currentFltNum === fltNum) {
                flag = true;
            }
        }
    })
    if (flag) {
        return true;
    }
}
function inDays(fltDay, days) {
    if (days.length === 0) {
        return true;
    }
    if (days.indexOf(fltDay) !== -1) {
        return true;
    }
}
function isBrule(bruleFilter, fltBrule) {
    if (!bruleFilter) {
        return true;
    }
    if (bruleFilter === fltBrule) {
        return true;
    }
}
function getAmount(tickets) {
    var amount = 0
    tickets.forEach(ticket => {
        amount += ticket.amount
    });
    return amount
}
function getAmountColor(amount) {
    if (between(amount, 0, 4)) {
        return "bg-[#C00000]"
    } else if(between(amount, 5, 9)){
        return "bg-[#FF0000]"
    } else if(between(amount, 10, 14)){
        return "bg-[#FF1A0E]"
    } else if(between(amount, 15, 19)){
        return "bg-[#FF341D]"
    } else if(between(amount, 20, 24)){
        return "bg-[#FF4E2C]"
    } else if(between(amount, 25, 29)){
        return "bg-[#FF683A]"
    } else if(between(amount, 30, 34)){
        return "bg-[#FF8249]"
    } else if(between(amount, 35, 39)){
        return "bg-[#FF9C58]"
    } else if(between(amount, 40, 44)){
        return "bg-[#FFB666]"
    } else if(between(amount, 45, 49)){
        return "bg-[#FFD075]"
    } else if(between(amount, 50, 54)){
        return "bg-[#FFEB84]"
    } else if(between(amount, 55, 59)){
        return "bg-[#E3E57F]"
    } else if(between(amount, 60, 64)){
        return "bg-[#C7DE79]"
    } else if(between(amount, 65, 69)){
        return "bg-[#ABD873]"
    } else if(between(amount, 70, 74)){
        return "bg-[#8ED16D]"
    } else if(between(amount, 75, 79)){
        return "bg-[#72CB68]"
    } else if(between(amount, 80, 84)){
        return "bg-[#56C462]"
    } else if(between(amount, 85, 89)){
        return "bg-[#39BE5C]"
    } else if(between(amount, 90, 94)){
        return "bg-[#1DB756]"
    } else if(between(amount, 95, 99)){
        return "bg-[#00B050]"
    } else {
        return "bg-[#00B0F0]"
    }
}

function between(x, min, max) {
    return x >= min && x <= max;
}

function FlightsOverDate(date) {
    return {"date": formatDate(date), flts: []}
}

export function formatDate(date) {
    const day = date.slice(6,8)
    const month = date.slice(4, 6)
    const year = date.slice(0, 4)

    date = `${month}/${day}/${year}`
    return date
}

export function getWeekDay(date){
    date = new Date(date);
    var day = date.getDay();
    return weekDays[day];
}

export function getOne(data, id) {
    var res = [];
    data.forEach(flight => {
        if (flight.id === id) {
            // console.log(flight)
            res = sortByCabin(flight)
        }
    })
    return res;
}

function sortByCabin(flight){
    var tickets = [];
    flight.tickets.forEach(item => {
        if(item.ticketCode !== "official"){
            tickets.push(item)
        }
    })
    const sortBy = ['W', 'S', 'Y', 'B', 'E', 'G', 'H', 'K', 'L', 'M', 'N', 'O', 'Q', 'V', 'X', 'T', 'U'] // ['b','a','c','e','d']
    const data = tickets // ['a','d','e']
    
    var res = data.sort((a,b) => sortBy.indexOf(a.ticketType) - sortBy.indexOf(b.ticketType))
    flight.tickets = res
    return flight
}

export default convert;