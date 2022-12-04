import { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'

export default function PickBrule (props) {
    let saved_brules = []
    for (let i=0; i < localStorage.length; i++) {
        let s_brule = JSON.parse(localStorage.getItem(`brule_${i}`))
        if (s_brule) {
            saved_brules.push(s_brule)
            // console.log(s_brule.name)
        }
    }
    const [brules, setBrules] = useState(saved_brules)
    const [selectedBrule, setSelectedBrule] = useState("")

    function selectBrule(value) {
        console.log(value)
        setSelectedBrule(value)
        props.bruleSelected(value)
    }

    useEffect(() => {
        setSelectedBrule(props.savedBrule)
    }, [props.savedBrule])

    return (
        <Menu as="div" className="ml-4 relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {selectedBrule ? selectedBrule : "Бизнес правило"}
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

                        {brules && brules.map((brule, index) => (
                            <div key={index}>
                                <button
                                href="#"
                                onClick={(e)=> selectBrule(brule.name)} // onRemoveFlight(fltNum)
                                value={brule}
                                className='text-gray-700 block px-4 py-2 text-sm flex w-full'
                                >
                                    <p>{brule.name}</p>
                                    {/* <TrashIcon onClick={()=> console.log(111)} className='ml-auto w-5 h-5'/> */}
                                </button>
                            </div>
                        ))}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}