import { useState, useRef, useEffect} from 'react';
import { read, utils, writeFile } from 'xlsx';
import Menu from '../components/menu';
import { HomeIcon, TableCellsIcon, MegaphoneIcon } from '@heroicons/react/20/solid'
import { useCookies } from 'react-cookie';
import { SaveLoad } from '../components/brules/saveLoad';
import save from '../methods/save';


function BRules() {
    const [cookies, setCookies] = useCookies(['brule'])
    var b_rule = localStorage.getItem("brule") ? JSON.parse(localStorage.getItem("brule")) : {brule: []}
    var new_b_rule;
    console.log(b_rule)
    if (b_rule.brule.length !== 0) {
        new_b_rule = Object.keys(b_rule.brule[0])
    }
    const [movies, setMovies] = useState(b_rule);
    const [h_headings, setH_headings] = useState(new_b_rule)
    const [saveName, setSaveName] = useState('')

    const [newBrule, setNewBrule] = useState({})
    // ["0", "1", "2", "3", "4", "6", "8", "10", "12", "14", "17", "20", "24", "28", "32", "36", "40", "45", "50", "60", "80", "100", "120", "180", "260"]
    
    console.log(h_headings, movies)

    function onSaveSelected(save) {
        console.log(save)
        localStorage.setItem("brule", JSON.stringify(save))
        setMovies(save)
        setH_headings(Object.keys(save.brule[0]))
    }
    function saveBrule() {
        console.log(saveName)
        let movies_mod_name = movies
        movies_mod_name.name = saveName
        save(saveName, 'brule', movies_mod_name)
        setNewBrule(movies_mod_name)
    }
    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(sheets)

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    let headings = rows[0]
                    console.log(headings)
                    delete headings.Ndo
                    setH_headings(Object.keys(headings))
                    localStorage.setItem("brule", JSON.stringify({"brule":rows}));
                    console.log(JSON.parse(localStorage.getItem("brule")))
                    // setCookies('brule', JSON.stringify(rows).slice(1,10), {path: '/'})
                    // console.log(cookies.brule, JSON.stringify(rows).slice(1,10))
                    setMovies({brule: rows, name: saveName})
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleExport = () => {
        const headings = [h_headings] // [["0", "1", "2", "3", "4", "6", "8", "10", "12", "14", "17", "20", "24", "28", "32", "36", "40", "45", "50", "60", "80", "100", "120", "180", "260"]]
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies.brule, { origin: 'B2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'B-Rule Report.xlsx');
    }

    return (
        <>
            <div className='flex p-5'>
                <Menu/>
                <div>
                    <div className="mb-2 mt-5 flex">
                        <SaveLoad saveSelected={onSaveSelected} newBrule={newBrule}/>

                        <div className="input-group ml-4">
                            <div className="flex">
                                <input type="file" name="file" className="" id="inputGroupFile" required onChange={handleImport}
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                {/* <label className="custom-file-label" htmlFor="inputGroupFile">Выберите файл</label> */}
                            </div>
                        </div>

                        <input value={saveName} onChange={(e) => {setSaveName(e.target.value)}} className='' />
                        <button onClick={()=>{saveBrule()}} className='btn p-2 ml-2 rounded-lg bg-green-300'>Сохранить</button>

                        <div className="flex ml-2">
                            <button onClick={handleExport} className="btn bg-blue-200 p-2 rounded-lg float-right">
                                Экспорт <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 offset-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className='bg-[#9ca5ad] border-gray-300 border p-2' scope="col">Ndo</th>
                                        {h_headings && h_headings.map((header, index) => (
                                            <th key={index} className='min-w-[45px] bg-[#9ca5ad] border-gray-300 border p-2' scope="col"><p>{header}</p></th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody> 
                                    {
                                        movies.brule.length
                                        ?
                                        movies.brule.map((movie, index) => (
                                            <tr key={index}>
                                                <th className='border border-gray-300' scope="row">{ 100-(index) }%</th>
                                                {
                                                    h_headings.map((header, index) => {
                                                        return(
                                                            <td className='border border-gray-300' key={index}>{ movie[h_headings[index]] }</td>
                                                        )
                                                    })
                                                }
                                            </tr> 
                                        ))
                                        :
                                        <tr>
                                            <td colSpan="5" className="text-center">Не найдено</td>
                                        </tr> 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default BRules;




  // return (

    
      // <div className='grid justify-items-start grid-rows-4 grid-flow-col gap-4 p-5'>
      //   <div className='leftbar w-full row-span-4'>
      //       <Menu/>
      //   </div>
      // </div>
  // );