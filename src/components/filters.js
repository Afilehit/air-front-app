import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import FlightNums from "./filters/flight-nums";
import PickDays from "./filters/pick-days";
import PickBrule from "./filters/pick-brule";

function Filters(props){
    const [capacity, setCapacity] = useState(true);
    const [bookings, setBookings] = useState(true);
    const [recClass, setRecClass] = useState(true);
    const [dateRange, setDateRange] = useState([new Date("11/28/2022"), new Date("01/20/2023")]);
    const [startDate, setStartDate] = useState(dateRange[0]);
    const [endDate, setEndDate] = useState(dateRange[1]);
    const btnClass = 'p-2.5 btn rounded-xl text-sm mr-2 text-white';

    const [origIatas, setOrigIatas] = useState(new Set())
    const [destIatas, setDestIatas] = useState(new Set())

    const [flightNums, setFlightNums] = useState([])
    const [filterFltNums, setFilterFltNums] = useState([])

    const [selOrigIatas, setSelOrigIatas] = useState([])
    const [selDestIatas, setSelDestIatas] = useState([])

    const [nDoFrom, setNDoFrom] = useState('')
    const [nDoTo, setNDoTo] = useState('')

    const [bkgFrom, setBkgFrom] = useState('')
    const [bkgTo, setBkgTo] = useState('')

    const [days, setDays] = useState([])
    const [filterDays, setFilterDays] = useState([])

    const [brule, setBrule] = useState("")
    const [filterBrule, setFilterBrule] = useState("")
    

    function findByFilters() {
        let filters = {
            "dateRange": dateRange,
            "nDoFrom": nDoFrom || undefined,
            "nDoTo": nDoTo || undefined,
            "bkgFrom": bkgFrom || undefined,
            "bkgTo": bkgTo || undefined,
            "capacity": capacity || undefined,
            "bookings": bookings || undefined,
            "recClass": recClass || undefined,
            "origIatas": selOrigIatas || undefined,
            "destIatas": selDestIatas || undefined,
            "fltNums": filterFltNums || undefined,
            "days": filterDays || undefined,
            "brule": filterBrule || undefined
        }
        props.filterValueSelected(filters)
    }

    function onFilterChanged(update) {
        
        // props.filterValueSelected(update)
    }
    function onDateRangeChanged(update) {
        setDateRange(update.dateRange);
        setStartDate(update.dateRange[0])
        setEndDate(update.dateRange[1])
        // if(update.dateRange[0] !== null && update.dateRange[1] !== null){
        //     onFilterChanged(update)
        // }
    }
    function onFlightNumsChanged(flightNums) {
        setFilterFltNums(flightNums)
        // onFilterChanged({"fltNums": flightNums})
    }
    function onDaysPicked(days){
        setFilterDays(days)
        // onFilterChanged({"days": days})
    }
    function onBruleSelected(brule) {
        setFilterBrule(brule)
        // onFilterChanged({"brule": brule})
    }
    function onOrigSelected(event) {
        var selected = [];
        for (var option of event.target.options)
        {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelOrigIatas(selected)
        console.log(selected)
        // onFilterChanged({"origIatas": selected})
    }
    function onDestSelected(event) {
        var selected = [];
        for (var option of event.target.options)
        {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelDestIatas(selected)
        console.log(selected)
        // onFilterChanged({"destIatas": selected})
    }
    function onBtnChanged(event) {
        console.log(event)
        if (event.target.id === "capacity"){
            setCapacity(!capacity)
            // onFilterChanged({"capacity": !capacity})
        } else if(event.target.id === "bookings"){
            setBookings(!bookings)
            // onFilterChanged({"bookings": !bookings})
        } else if (event.target.id === "recclass") {
            setRecClass(!recClass)
            // onFilterChanged({"recClass": !recClass})
        }
        
    }
    function onInputChanged(event) {
        console.log(event.target)
        var inputId = event.target.id
        var input = {}
        input[inputId] = event.target.value

        // onFilterChanged(input)
    }
    function selectIata(orig, dest) {
        document.getElementById("orig_opt").selectedIndex = -1;
        document.getElementById("dest_opt").selectedIndex = -1;
        let selectedOrig = []
        let selectedDest = []
        
        for (let i=0; i < orig.length; i++) {
            selectedOrig.push(orig[i])
        }
        for (let i=0; i < dest.length; i++) {
            selectedDest.push(dest[i])
        }
        let optionsOrig = document.querySelectorAll(`.orig_opt`);
        for (let i=0; i < optionsOrig.length; i++) {
            if (selectedOrig.indexOf(optionsOrig[i].value) !== -1) {
                optionsOrig[i].selected = "true";
            }
        }
        let optionsDest = document.querySelectorAll(`.dest_opt`);
        for (let i=0; i < optionsDest.length; i++) {
            if (selectedDest.indexOf(optionsDest[i].value) !== -1) {
                optionsDest[i].selected = "true";
            }
        }
        let obj = {"orig_opt": selectedOrig, "dest_opt": selectedDest}
        // onFilterChanged(obj)
    }
    function selectAll(id)
    {
    	let options = document.querySelectorAll(`.${id}`);
        let selected = []
        let cnt_true = 0
    	for (let i=0; i < options.length; i++)
    	{
            console.log(options[i].selected)
            if(options[i].selected) {
                cnt_true += 1
            }
    		options[i].selected = "true";
            selected.push(options[i].value)
    	}
        console.log(cnt_true, options.length)
        if (cnt_true === options.length) {
            document.getElementById(id).selectedIndex = -1;
            selected = []
        }
        let name = id === "orig_opt" ? "origIatas" : "destIatas"
        if (name === origIatas) {
            setOrigIatas(new Set(selected))
        } else {
            setDestIatas(new Set(selected))
        }
        // let obj = {}
        // obj[name] = selected
        // onFilterChanged(obj)
    }
    useEffect(()=>{
        if(props.flights !== undefined) {
            props.flights.forEach(date => {
                date.flts.forEach(flt => {
                    setOrigIatas(prev => new Set(prev.add(flt.origIata)))
                    setDestIatas(prev => new Set(prev.add(flt.destIata)))
                })
            })
        }
    },[props.flights])

    useEffect(() => {
        let saveFilter = props.saveFilter

        if (saveFilter // 👈 null and undefined check
            && Object.keys(saveFilter).length === 0
            && Object.getPrototypeOf(saveFilter) === Object.prototype) {
            return
        }
        console.log(saveFilter.dateRange)
        
        setStartDate(saveFilter.dateRange[0])
        setEndDate(saveFilter.dateRange[1])
        setDateRange(saveFilter.dateRange)
        
        selectIata(saveFilter.origIatas, saveFilter.destIatas)
        // setSelOrigIatas(saveFilter.origIatas)
        // setSelDestIatas(saveFilter.destIatas)
        setFlightNums(saveFilter.flightNums)

        setNDoFrom(saveFilter.nDoFrom)
        setNDoTo(saveFilter.nDoTo)
        setBkgFrom(saveFilter.bkgFrom)
        setBkgTo(saveFilter.bkgTo)

        setDays(saveFilter.days)
        setBrule(saveFilter.brule)
    }, [props.saveFilter])

    return(
        <div className='filter flex justify-items-start mb-4'>
            <div className="block">
                <div className='flex mb-4'>
                    <div className="relative block">
                        <label className='absolute text-sm font-medium text-gray-300'>Выберите период</label>
                        <DatePicker id="datepicker" className='p-2.5 text-sm bg-white rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]'
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            locale="ru"
                            onChange={(update) => {
                                onDateRangeChanged({dateRange: update})
                        }} />
                    </div>
                    <div className="flex ml-4">
                        <p className="mt-auto mb-auto">Ndo</p>
                        <input value={nDoFrom} id="nDoFrom" onChange={(e)=>{onInputChanged(e); setNDoFrom(e.target.value)}} placeholder="От" className="p-2.5 ml-2 w-12 rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]"></input>
                        <input value={nDoTo} id="nDoTo" onChange={(e)=>{onInputChanged(e); setNDoTo(e.target.value)}} placeholder="До" className="p-2.5 ml-2 w-12 rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]"></input>
                    </div>
                    <div className="flex ml-4">
                        <p className="mt-auto mb-auto">Bkgs</p>
                        <input value={bkgFrom} id="bkgFrom" onChange={(e)=>{onInputChanged(e); setBkgFrom(e.target.value)}} placeholder="От" className="p-2.5 ml-2 w-12 rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]"></input>
                        <input value={bkgTo} id="bkgTo" onChange={(e)=>{onInputChanged(e); setBkgTo(e.target.value)}} placeholder="До" className="p-2.5 ml-2 w-12 rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]"></input>
                    </div>

                    <FlightNums flightNumsChanged={onFlightNumsChanged} flightNums={flightNums}/>
                    <PickDays daysPicked={onDaysPicked} days={days}/>
                    <PickBrule bruleSelected={onBruleSelected} savedBrule={brule}/>

                    <div className="relative ml-4">
                        <div className="absolute">
                            <select id="orig_opt" className="text-black" multiple="multiple" onChange={(event) => {onOrigSelected(event)}}>
                                {origIatas &&
                                    Array.from(origIatas).map((airport, index) => (
                                        <option className="orig_opt" key={index} value={airport}>{airport}</option>
                                    ))
                                }
                            </select>
                            <button onClick={()=>selectAll("orig_opt")} className="btn bg-gray-300 p-1 px-2 rounded-lg">Всё</button>
                        </div>
                    </div>
                    <div className="relative ml-16">
                        <div className="absolute">
                            <select id="dest_opt" className="text-black" multiple="multiple" onChange={(event) => {onDestSelected(event)}}>
                                {destIatas &&
                                    Array.from(destIatas).map((airport, index) => (
                                        <option className="dest_opt" key={index} value={airport}>{airport}</option>
                                    ))
                                }
                            </select>
                            <button onClick={()=>selectAll("dest_opt")} className="btn bg-gray-300 p-1 px-2 rounded-lg">Всё</button>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <button id="capacity" onClick={onBtnChanged} className={capacity ? `${btnClass} bg-[#3e83a5]` : `${btnClass} bg-[#316882]`}>Capacity</button>
                    <button id="bookings" onClick={onBtnChanged} className={bookings ? `${btnClass} bg-[#3e83a5]` : `${btnClass} bg-[#316882]`}>Bookings</button>
                    <button id="recclass" onClick={onBtnChanged} className={recClass ? `${btnClass} bg-[#3e83a5]` : `${btnClass} bg-[#316882]`}>Rec Class</button>
                    <button onClick={findByFilters} className={`${btnClass} bg-green-700`}>
                        Найти
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Filters