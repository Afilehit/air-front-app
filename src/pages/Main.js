import { useState, useRef, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import FlightsOverview from '../components/flights-overview';
import Menu from '../components/menu';

registerLocale('ru', ru)

function Main() {
  const ref = useRef(null)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // function createFlt(way, aircomp, flt, date) {
  //   const el_date = document.getElementById(date)
    
  // }
  
  useEffect(() => {
    // const el = document.getElementById('11/18/22')
    // console.log(el)
  }, [])

  return (
        <div className='grid justify-items-start grid-rows-4 grid-flow-col gap-4 p-5'>
            <div className='leftbar row-span-4 w-full'>
                <Menu/>
            </div>
            <div className='filter col-span-2'>
                <label className='text-sm font-medium text-gray-300'>Выберите период</label>
                <div className='flex'>
                    <DatePicker className='p-2.5 text-sm bg-gradient-to-r from-[#320D4D] to-[#30184D] rounded-md outline-none focus:ring-violet-500 focus:border-violet-500 border border-violet-300'
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        locale="ru"
                        onChange={(update) => {
                            setDateRange(update);
                    }} />
                </div>
            </div>
            <div className='row-span-3 col-span-2 shrink-0 w-full scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-violet-400 overflow-x-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                <FlightsOverview/>
            </div>
        </div>
  );
}

export default Main;
