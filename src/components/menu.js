import { HomeIcon, TableCellsIcon, MegaphoneIcon } from '@heroicons/react/20/solid';
import { Link } from "react-router-dom";

function Menu() {
    return (
        <div className='justify-self-center w-64 p-5'>
            <Link to="/">
                <div className='relative items-center p-2.5 flex justify-center rounded-md bg-gradient-to-r from-[#320D4D] to-[#30184D] mb-4'>
                    <HomeIcon className="absolute left-4 h-5 w-5 text-violet-500"/>
                    <p className='text-md font-semibold'>Главная</p>
                </div>
            </Link>
            <Link to="/brules">
                <div className='relative items-center p-2.5 flex justify-center rounded-md bg-gradient-to-r from-[#320D4D] to-[#30184D] mb-4'>
                    <TableCellsIcon className="absolute left-4 h-5 w-5 text-violet-500"/>
                    <p className='text-md font-semibold'>Бизнес правила</p>
                </div>
            </Link>
            <div className='relative items-center p-2.5 flex justify-center rounded-md bg-gradient-to-r from-[#320D4D] to-[#30184D] mb-4'>
                <MegaphoneIcon className="absolute left-4 h-5 w-5 text-violet-500"/>
                <p className='text-md font-semibold'>Техподдержка</p>
            </div>
        </div>
    )
}
export default Menu