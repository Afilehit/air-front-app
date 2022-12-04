import { useState, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import { removeSave } from '../../methods/save';

export function SaveLoad (props) {
    let given_brule = localStorage.getItem('')
    let saved_brules = []
    for (let i=0; i < localStorage.length; i++) {
        let s_brule = JSON.parse(localStorage.getItem(`brule_${i}`))
        if (s_brule) {
            saved_brules.push(s_brule)
        }
    }
    const [brules, setBrules] = useState(saved_brules)

    function loadBrule(value) {
        console.log(value)
        props.saveSelected(value)
    }
    function removeSaveBrule (currentSaveName, saveListName) {
        console.log(currentSaveName, saveListName)
        removeSave(currentSaveName, saveListName)
        setBrules((current) =>
          current.filter((brule) => brule.name !== currentSaveName)
        );
    };
    
    useEffect(() => {
        if (props.newBrule && Object.keys(props.newBrule).length === 0) {
            return;
        }
        setBrules(current => [...current, props.newBrule])
        console.log(props.newBrule)
    }, [props.newBrule])


    return (
        <Menu as="div" className="mt-auto mb-auto ml-4 relative inline-block text-left">
            
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Бизнес правило
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

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
                            <div className='flex' key={index}>
                                <button
                                href="#"
                                onClick={(e)=> loadBrule(brule)} // onRemoveFlight(fltNum)
                                value={brule}
                                className='text-gray-700 block px-4 py-2 text-sm flex w-full'
                                >
                                    <p>{brule.name}</p>
                                    
                                </button>
                                <TrashIcon onClick={()=> removeSaveBrule(brule.name, 'brule')} className='ml-auto hover:text-red-500 w-9 h-9 mr-2'/>
                            </div>
                        ))}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}