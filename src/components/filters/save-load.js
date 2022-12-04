import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import save, { removeSave } from '../../methods/save';

function SaveLoad(props) {
    const [saveName, setSaveName] = useState("")
    const [saveNames, setSaveNames] = useState([])

    let filterValue = props.filterValue
    filterValue["saveName"] = saveName 
    // console.log(filterValue)


    function loadFilter(pickedSaveName) {
        console.log(pickedSaveName)
        for (let i=0; i < localStorage.length; i++) {
            let save = JSON.parse(localStorage.getItem(`air-saves_${i}`))
            if (save && save.saveName === pickedSaveName) {
                console.log(save)
                props.saveLoaded(save)
            }
        }
    }
    function loadSaves() {
        for (let i=0; i < localStorage.length; i++) {
            let save = JSON.parse(localStorage.getItem(`air-saves_${i}`))
            if (save && saveNames.indexOf(save.saveName) === -1) {
                setSaveNames(current => [...current, save.saveName])
            }
        }
    }
    function removeSaveFilter (currentSaveName, saveListName) {
        removeSave(currentSaveName, saveListName)
        setSaveNames((current) =>
          current.filter((saveName) => saveName !== currentSaveName)
        );
    };

    useEffect(()=>{
        // console.log(props.filterValue)
        loadSaves()
    }, [props.filterValue])

    return (
        <div className="flex mb-auto mt-auto">
            <div className="flex">
                <input onChange={(e)=>{setSaveName(e.target.value)}} className="p-2.5 w-32 mr-2 h-auto rounded-md outline-none focus:ring-[#68A3C2] focus:border-[#68A3C2] border border-[#9ca5ad]"/>
                <button onClick={(e)=>{save(saveName, 'air-saves', filterValue)}} className="btn px-2 rounded-lg bg-green-300">Сохранить</button>
            </div>
            <div className="flex">
                <Menu as="div" className="mt-1 mr-4 ml-4 relative inline-block text-left">
                    
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Фильтр
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
                            {saveNames && saveNames.map((save_name, index) => (
                                <div className='flex' key={index}>
                                    <button
                                    href="#"
                                    onClick={()=> loadFilter(save_name)}
                                    value={save_name}
                                    className='text-gray-700 block px-4 py-2 text-sm flex w-full'
                                    >
                                        <p>{save_name}</p>
                                    </button>
                                    <TrashIcon onClick={()=> removeSaveFilter(save_name, 'air-saves')} className='hover:text-red-500 ml-auto mr-2 w-9 h-9'/>
                                </div>
                            ))}

                        </div>
                    </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default SaveLoad