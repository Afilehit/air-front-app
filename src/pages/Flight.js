import { useState, useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import Menu from '../components/menu';
import { useParams } from 'react-router-dom';
import { formatDate, getOne } from '../methods/convert';
import { getFltTime } from '../methods/get';
import { SaveLoad } from '../components/brules/saveLoad';
import axios from 'axios';
//БЛК 

registerLocale('ru', ru)

function Flight(props) {
  const { id } = useParams();
  const [flight, setFlight] = useState();
  const [allFlights, setAllFlights] = useState();
  const db = props.db

  function onSaveSelected(save) {
    localStorage.setItem(`${flight.origIata}-${flight.destIata}-${flight.fltNum}`, JSON.stringify(save))
  }
  function isSameFltNum(flt) {
    if (flt.fltNum === flight.fltNum && flt.origIata === flight.origIata &&
        flt.destIata === flight.destIata) {
      return true;
    }
  }

  function nearestFlt(type) {
    let currentFlightTime = getFltTime(flight.fltDate, flight.arrivalTime)
    let nearest = Infinity;
    let res;
    console.log(type)
    
    allFlights.forEach(flt => {
      let fltTime = getFltTime(flt.fltDate, flt.arrivalTime)
      let destTimeFlt = fltTime - currentFlightTime
      let nextOrPrev;
      if (type === 'next') {
        nextOrPrev = destTimeFlt > 0
      } else {
        nextOrPrev = destTimeFlt < 0
      }
      if (nextOrPrev && destTimeFlt <= nearest && isSameFltNum(flt)) {
        nearest = destTimeFlt;
        res = flt;
      }
    })
    if (res) {
      setFlight(res)
    } else {
      alert('Этого рейса не существует')
    }
    console.log(res, nearest)
  }
  
  useEffect(() => {
    async function getFlight(){
      // const res = await axios.get('/api/getAllFlightTables')
      // setFlight(res.data)
      // const newData = getOne(res.data, id)
      let allflights = (await db.flights.toArray())[0]
      setAllFlights(allflights.data)
      const newData = getOne(allflights.data, id)
      console.log(newData)
      setFlight(newData)
      // console.log(newData, Object.keys(convert(res.data)))
      // console.log(res.data)
    }
    getFlight();
  }, [])

  return (
        <div className='justify-items-start p-5 flex'>
            <div className=''>
              <Menu/>
            </div>
            <div className='mt-5 w-full'>
              <div className='flex p-4 bg-[#DFE4EA] w-full h-auto mb-4 rounded-md'>
                {flight &&
                <div className='block'>
                  <div className='flex'>
                    <p className='text-xl font-semibold mt-auto mb-auto'>{flight.origIata}-{flight.destIata} {flight.fltNum}</p>
                    {/* <SaveLoad saveSelected={onSaveSelected} newBrule={{}}/> */}
                  </div>
                  <button className='btn p-2 bg-blue-300 rounded-lg mt-auto mb-auto' onClick={() => nearestFlt('prev')}>ПРЕД РЕЙС</button>
                  <button className='btn p-2 bg-blue-300 rounded-lg mt-auto mb-auto ml-4' onClick={() => nearestFlt('next')}>СЛЕД РЕЙС</button>
                </div>
                }
              </div>
              <div>

              </div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className='bg-[#DFE4EA] border border-gray-300 p-2'>КАБ</th>
                    <th className='bg-[#DFE4EA] border border-gray-300 p-2'>КОЛ</th>
                    <th className='bg-[#DFE4EA] border border-gray-300 p-2'>ВЫР</th>
                  </tr>
                </thead>
                <tbody>
                  {flight && flight.tickets && flight.tickets.map((flt) => (
                  flt.ticketCode !== "official" && (<tr key={flt.id}>
                    <td className='border border-gray-300 p-1'>{flt.ticketType}</td>
                    <td className='border border-gray-300 p-1'>{flt.amount}</td>
                    <td className='border border-gray-300 p-1'>{flt.totalCash}</td>
                  </tr>)
                  ))}
                </tbody>
              </table>
            </div>
        </div>
  );
}

export default Flight;
