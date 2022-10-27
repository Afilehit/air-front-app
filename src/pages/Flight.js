import { useState, useRef, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import FlightsOverview from '../components/flights-overview';
import Menu from '../components/menu';
import { useParams } from 'react-router-dom';

registerLocale('ru', ru)

function Flight() {
  const { id } = useParams();

  useEffect(() => {
    const el = document.getElementById('11/18/22')
    console.log(el)
  }, [])

  return (
        <div className='grid justify-items-start grid-rows-4 grid-flow-col gap-4 p-5'>
            <div className='col-span-2'>
              <p>{id}</p>
            </div>
        </div>
  );
}

export default Flight;
