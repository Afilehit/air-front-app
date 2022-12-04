import { useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import FlightsOverview from '../components/flights-overview';
import Menu from '../components/menu';

registerLocale('ru', ru)

function Main() {
  
  useEffect(() => {
    // const el = document.getElementById('11/18/22')
  }, [])

  return (
        <div className='flex p-5 justify-items-start w-full'>
            <div className='leftbar w-auto'>
                <Menu/>
            </div>
            <FlightsOverview/>
        </div>
  );
}

export default Main;
