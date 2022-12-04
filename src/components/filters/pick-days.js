import { useState, useEffect } from 'react';

export default function PickDays(props) {
    const [days, setDays] = useState(
    [
        {"name": "Пн", "value": true},
        {"name": "Вт", "value": true},
        {"name": "Ср", "value": true},
        {"name": "Чт", "value": true},
        {"name": "Пт", "value": true},
        {"name": "Сб", "value": true},
        {"name": "Вс", "value": true},
    ])

    function getClassDay(day, index){
        var dayClass = 'border border-blue-200 bg-white text-white text-sm h-9 p-2'
        // console.log(days)
        if (index === 0) {
            dayClass += ' rounded-l-xl'
        } else if (index === days.length-1) {
            dayClass += ' rounded-r-xl'
        }
        if (day.value) {
            dayClass += ' bg-[#3e83a5]'
        } else {
            dayClass += ' bg-[#316882]'
        }
        return dayClass
    }
    function changeDay(e) {
        let day = JSON.parse(e.target.value)
        const new_days = days.map(obj => {
            if (obj.name === day.name) {
                return {"name": day.name, "value": !day.value};
            }
            return obj;
        });
        setDays(new_days)
    }

    useEffect(() => {
        let new_days = []
       
        days.forEach(day => { day.value && new_days.push(day.name)})
        console.log(new_days)
        props.daysPicked(new_days)
    }, [days])

    useEffect(() => {
        if (props.days.length === 0) {
            return
        }
        console.log(props.days)
        let new_days = [
            {"name": "Пн", "value": props.days.indexOf("Пн") !== -1},
            {"name": "Вт", "value": props.days.indexOf("Вт") !== -1},
            {"name": "Ср", "value": props.days.indexOf("Ср") !== -1},
            {"name": "Чт", "value": props.days.indexOf("Чт") !== -1},
            {"name": "Пт", "value": props.days.indexOf("Пт") !== -1},
            {"name": "Сб", "value": props.days.indexOf("Сб") !== -1},
            {"name": "Вс", "value": props.days.indexOf("Вс") !== -1},
        ]
        console.log(new_days)
        setDays(new_days)
        
    }, [props.days])

    return (
        <div className='flex ml-2'>
            {days.map((day, index) => (
                <button key={index} value={JSON.stringify(day)} onClick={changeDay} className={getClassDay(day, index)}>
                    {day.name}
                </button>
            ))}
        </div>
    )
}