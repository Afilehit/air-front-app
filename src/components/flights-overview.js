import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import convert, { getWeekDay } from '../methods/convert';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Dexie from "dexie";
import Filters from './filters';
import SaveLoad from './filters/save-load';

function FlightsOverview(props) {
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [lastUpdatedDate, setLastUpdatedDate] = useState('Никогда')
    const [flights, setFlights] = useState()
    const [dateRange, setDateRange] = useState([new Date("11/28/2022"), new Date("01/20/2023")]);
    const [capacity, setCapacity] = useState(true)
    const [bookings, setBookings] = useState(true)
    const [recClass, setRecClass] = useState(true)
    const [origIatas, setOrigIatas] = useState([])
    const [destIatas, setDestIatas] = useState([])

    const [nDoFrom, setNDoFrom] = useState()
    const [nDoTo, setNDoTo] = useState()

    const [bkgFrom, setBkgFrom] = useState(0)
    const [bkgTo, setBkgTo] = useState(100)

    const [flightNums, setFlightNums] = useState([])
    const [days, setDays] = useState([])
    const [brule, setBrule] = useState("")

    const [filterValue, setFilterValue] = useState({})
    const [saveFilter, setSaveFilter] = useState({})

    // const db = new Dexie("ReactDexie");

    // db.version(4).stores({
    //   flights: "id, *data, date",
    //   filteredFlights: "id, *data"
    // })
    // db.open().catch((err) => {
    //     console.log(err.stack || err)
    // })
    const db = props.db


    function onFilterValueSelected(filterValue){
      filterValue.dateRange && setDateRange(filterValue.dateRange)
      filterValue.capacity !== undefined && setCapacity(filterValue.capacity)
      filterValue.bookings !== undefined && setBookings(filterValue.bookings)
      filterValue.recClass !== undefined && setRecClass(filterValue.recClass)
      filterValue.origIatas && filterValue.origIatas.length !== 0 && setOrigIatas(filterValue.origIatas)
      filterValue.destIatas && filterValue.destIatas.length !== 0 && setDestIatas(filterValue.destIatas)
      filterValue.nDoFrom !== undefined && setNDoFrom(filterValue.nDoFrom)
      filterValue.nDoTo !== undefined && setNDoTo(filterValue.nDoTo)
      filterValue.bkgFrom !== undefined && setBkgFrom(filterValue.bkgFrom)
      filterValue.bkgTo !== undefined && setBkgTo(filterValue.bkgTo)
      filterValue.fltNums !== undefined && filterValue.fltNums.length !== 0 && setFlightNums(filterValue.fltNums)
      filterValue.days !== undefined && filterValue.days.length !== 0 && setDays(filterValue.days)
      filterValue.brule !== undefined && setBrule(filterValue.brule)

      console.log(filterValue)
    }

    function onSaveLoaded(save) {
      save.dateRange = [new Date(save.dateRange[0]), new Date(save.dateRange[1])]
      console.log(save.dateRange)
      setDateRange(save.dateRange)
      setOrigIatas(save.origIatas)
      setDestIatas(save.destIatas)
      setNDoFrom(save.nDoFrom)
      setNDoTo(save.nDoTo)
      setBkgFrom(save.bkgFrom)
      setBkgTo(save.bkgTo)
      setFlightNums(save.flightNums)
      setDays(save.days)
      setBrule(save.brule)
      
      setSaveFilter(save)
    }

    // const [cookies, setCookies] = useCookies(['brule']);
    function findFlights(flts) {
      // res.data = res.data.slice(0, 1000)
      // console.log(res.data)
      var newData = Object.values(convert(flts, dateRange[0], dateRange[1], origIatas, destIatas, nDoFrom, nDoTo, bkgFrom, bkgTo, flightNums, days, brule))
      setFlights(newData)
      console.log(newData)
      db.filteredFlights.put({"id": 0, "data": newData}).then(async() => {
        console.log('Setted!')
      });
      setFilterValue(
        {
          dateRange: dateRange,
          origIatas: origIatas,
          destIatas: destIatas,
          nDoFrom: nDoFrom,
          nDoTo: nDoTo,
          bkgFrom: bkgFrom, bkgTo: bkgTo, flightNums: flightNums, days: days, brule: brule
        }
      )
    }

    async function getNewFlights(){
      setFlights()
      if(dateRange[0] == null || dateRange[1] == null) {
        return
      }
      console.log('getting flights...')
      axios.get('/api/getAllFlightTables')
      .then(res => {
        let newDate = new Date()
        let currentDate = `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()} ${newDate.toTimeString().split(' ')[0]}`
        db.flights.put({"id": 0, "data": res.data, "date": currentDate })
        setLastUpdatedDate(currentDate)
        findFlights(res.data)
      })
    }
    useEffect(() => {
      const getFlights = async() => {
        let filteredFlights = (await db.filteredFlights.toArray())[0].data;
        let allFlights = (await db.flights.toArray())[0]
        setLastUpdatedDate(allFlights.date)
        console.log(allFlights.date)
        console.log(filteredFlights)
        setFlights(filteredFlights);
      }
      const findInOldFlights = async() => {
        setFlights()
        console.log("finding in old flights...")
        let oldFlights = (await db.flights.toArray())[0].data
        findFlights(oldFlights)
        console.log("founded!")
      }
      if (isPageLoaded) {
        findInOldFlights()
      } else {
        setIsPageLoaded(true);
        getFlights();
      }
    }, [dateRange, capacity, recClass, origIatas, destIatas, nDoFrom, nDoTo, bkgFrom, bkgTo, flightNums, days, brule])
    
    // useEffect(() => {
    //   //get all flights from the database
    //   const getFlights = async() => {
    //     let filteredFlights = (await db.filteredFlights.toArray())[0].data;
    //     console.log(filteredFlights)
    //     setFlights(filteredFlights);
    //   }
    //   getFlights();
    // }, [])

    function showPopover(e) {
      console.log(e)
    }
    
    return(
      <div className='flex flex-col w-full overflow-hidden'>
        <div className='flex mb-4'>
          <SaveLoad saveLoaded={onSaveLoaded} filterValue={filterValue} />
          <div className='flex'>
            <p className='mt-auto mb-auto'>Последнее обновление: {lastUpdatedDate}</p>
            <button onClick={getNewFlights} className='btn bg-blue-300 rounded-lg p-2 mt-auto mb-auto ml-4'>Обновить</button>
          </div>
        </div>
        <Filters filterValueSelected={onFilterValueSelected} flights={flights} saveFilter={saveFilter}/>
        <div className="overview overflow-x-scroll overflow-y-scroll h-[70vh] flex shrink-0 scrollbar-thin scrollbar-thumb-[#9ca5ad] scrollbar-track-[#D3DCE4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {flights && flights.map((item) => (
                  <div key={item.date} className='w-64 shrink-0 pb-2 pt-1 mr-2'>
                      <div className='w-full'>
                        <p className='font-bold bg-[#9ca5ad] rounded-t-md'>{item.date} {getWeekDay(item.date)} ({item.flts.length})</p>
                      </div>
                      {
                      item.flts.map((flt) => (
                        <div className='relative w-full' key={flt.id}>
                          <Link className='inline-block bg-[#D3DCE4] w-full' to={`/flight/${flt.id}`}>
                            
                            <div className='flex relative hover:bg-[#c0c7ce] pl-4 pr-4 mt-1 mb-1'>
                              <div className='space-x-2 flex'>
                                  <p className='way'>{flt.origIata}{flt.destIata}</p>
                                  <p className='aircompany'>{flt.airlCode}</p>
                                  <p className='flt'>{flt.fltNum}</p>
                              </div>
                              <div className='ml-auto flex gap-1'>
                                {capacity && <p className='rounded-lg w-6 bg-white text-black text-sm pt-[2px]'>{Number(flt.tickets[0].ticketCapacity)}</p>}
                                {bookings && <p className={`${flt.amountColor} strokeme text-white rounded-lg w-6 h-6 text-black text-sm pt-[2px]`}>{flt.amount}</p>}
                                {recClass && <p className={`${flt.classColor} text-white t-class w-6 rounded-lg bg-violet-700`}>{flt.class}</p>}
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
              ))}
        </div>
        {/* <div id="popover" className='absolute z-10 bg-gray-200 hide'>
          <p>Alert</p>
        </div> */}
    </div>
        
    )
}

export default FlightsOverview;