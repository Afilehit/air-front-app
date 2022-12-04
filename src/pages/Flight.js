import { useState, useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import Menu from '../components/menu';
import { useParams } from 'react-router-dom';
import { getOne } from '../methods/convert';
import { SaveLoad } from '../components/brules/saveLoad';
import axios from 'axios';
//БЛК 

registerLocale('ru', ru)

function Flight() {
  const { id } = useParams();
  const [flight, setFlights] = useState()

  function onSaveSelected(save) {
    localStorage.setItem(`${flight.origIata}-${flight.destIata}-${flight.fltNum}`, JSON.stringify(save))
  }
  
  useEffect(() => {
    async function getFlight(){
      const res = await axios.get('/api/getAllFlightTables')
      // setFlights(res.data)
      const newData = getOne(res.data, id)
      console.log(newData)
      setFlights(newData)
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
              <div className='flex pl-4 pr-4 bg-[#DFE4EA] w-full h-16 mb-4 rounded-md'>
                {flight &&
                  <div className='flex'>
                    <p className='text-xl font-semibold mt-auto mb-auto'>{flight.origIata}-{flight.destIata} {flight.fltNum}</p>
                    <SaveLoad saveSelected={onSaveSelected} newBrule={{}}/>
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
