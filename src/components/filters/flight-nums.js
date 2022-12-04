import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function FlightNums(props) {
    const [inputFltVal, setInputFltVal] = useState('')
    const [flightNums, setFlightNums] = useState([])

    function onAddFlight() {
        // console.log(inputFltVal)
        if (flightNums.indexOf(inputFltVal) === -1){
            setFlightNums(current => [...current, inputFltVal])
        }
    }
    function onRemoveFlight(fltNum) {
        // console.log(e, e.target.value)
        var array = flightNums.filter(fltN => fltN !== fltNum);
        
        setFlightNums(array)
    }
    useEffect(() => {
        props.flightNumsChanged(flightNums)
    }, [flightNums])

    useEffect(() => {
        setFlightNums(props.flightNums)
    }, [props.flightNums])

    return (
        <Menu as="div" className="mt-1 ml-4 relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Рейсы
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items static className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item disabled>
                        <div className='flex p-2'>
                            <input onChange={(update)=>{setInputFltVal(update.target.value)}} className='p-2.5 ml-2 rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]' />
                            <button onClick={onAddFlight} className='ml-2 p-2.5 btn rounded-xl text-sm mr-2 text-white bg-[#3e83a5]'>Добавить</button>
                        </div>
                    </Menu.Item>
                    {flightNums && flightNums.map((fltNum, index) => (
                        <div key={index}>
                            <button
                            href="#"
                            onClick={()=> onRemoveFlight(fltNum)}
                            value={fltNum}
                            className={classNames(
                                'text-gray-700',
                                'block px-4 py-2 text-sm flex w-full'
                            )}
                            >
                                <p>{fltNum}</p>
                                <TrashIcon onClick={()=> onRemoveFlight(fltNum)} className='ml-auto w-5 h-5'/>
                            </button>
                        </div>
                    ))}

                </div>
            </Menu.Items>
        </Transition>
        </Menu>
    )
}