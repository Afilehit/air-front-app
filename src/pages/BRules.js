import { useState, useRef, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import FlightsOverview from '../components/flights-overview';
import Menu from '../components/menu';

import { HomeIcon, TableCellsIcon, MegaphoneIcon } from '@heroicons/react/20/solid'

registerLocale('ru', ru)

function BRules() {
  const ref = useRef(null)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // function createFlt(way, aircomp, flt, date) {
  //   const el_date = document.getElementById(date)
    
  // }
  
  useEffect(() => {
    const el = document.getElementById('11/18/22')
    console.log(el)
  }, [])

  return (
      <div className='grid justify-items-start grid-rows-4 grid-flow-col gap-4 p-5'>
        <div className='leftbar w-full row-span-4'>
            <Menu/>
        </div>
      </div>
  );
}

export default BRules;
