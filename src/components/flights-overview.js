import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import get from '../methods/get';
import axios from 'axios';

function FlightsOverview() {
    const [flights, setFlights] = useState({})
    const list = [
        {
          id: 1,
          date: '11/18/22',
          flts: [
            {
              id: 1,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '249',
              class: 'M'
            },
            {
              id: 2,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '259',
              class: 'Y'
            },
            {
              id: 3,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '249',
              class: 'M'
            },
            {
              id: 4,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '249',
              class: 'M'
            },
            {
              id: 5,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '249',
              class: 'M'
            },
            {
              id: 6,
              way: 'ROVCEK',
              aircompany: 'A4',
              name: '249',
              class: 'M'
            },
          ]
        },
        {
          id: 2,
          date: '11/19/22',
          flts: [
            {
              id: 1,
              way: 'MOWDXB',
              aircompany: 'A4',
              name: '251',
              class: 'B'
            }
          ]
        },
        // {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     date: '11/19/22',
        //     flts: [
        //       {
        //         id: 1,
        //         way: 'MOWDXB',
        //         aircompany: 'A4',
        //         name: '251',
        //         class: 'B'
        //       }
        //     ]
        //   },
    ];
    useEffect(() => {
      axios.get('/api/getAllFlightTables')
      .then(res => {
          setFlights(res.data)
          console.log(res.data)
      })
    }, [])
    return(
        <div className="overview flex">
            {list.map((item) => (
                <div key={item.id} id={item.id} className='w-64 shrink-0 pb-2 pt-1 bg-gradient-to-r from-[#320D4D] to-[#30184D] border-transparent rounded-md border-t border-l border-r mr-2'>
                    <div className='w-full'>
                        <p className='text-gray-300 font-bold'>{item.date} Ср (2)</p>
                    </div>
                    {item.flts.map((flt) => (
                      <Link to={`/flight/${flt.id}`} key={flt.id}>
                        <div className='flex relative hover:bg-violet-500 pl-4 pr-4 mt-1 mb-1'>
                          <div className='space-x-2 flex'>
                              <p className='way'>{flt.way}</p>
                              <p className='aircompany'>{flt.aircompany}</p>
                              <p className='flt'>{flt.name}</p>
                          </div>
                          <p className='t-class ml-auto w-6 rounded-lg bg-violet-700'>{flt.class}</p>
                        </div>
                      </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default FlightsOverview;