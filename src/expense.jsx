import { useState } from "react";
import trash from '/src/img/trash-blank-alt-svgrepo-com.svg';
export default function Expense(props){
    const [hover,setHover] = useState(false)
        const handleDelete = (id) => {
        props.setExpenses(prev => prev.filter(task => task.id !== id));
    };
    return(
        <div  onMouseOver={() => setHover(true)} onMouseOut={()=>setHover(false)}  className="relative w-full h-10 px-2 border-b border-gray-400 flex items-center lg:gap-36 sm:gap-10 text-sm text-center">
                    <h2 className="w-28 sm:text-base text-sm" >{props.date}</h2>
                    <p className="w-28 sm:text-base text-sm" >{props.category}</p>
                    <p className="w-28" >{props.note}</p>
                    <p className="w-28 font-semibold text-center sm:text-base text-sm">{props.amount} {props.currency}</p>  
                {hover && (
                    <div className="absolute xl:top-1/2 xl:right-4 right-1 top-0 xl:mt-0 mt-1 xl:-translate-y-1/2">
                        <button onClick={()=>handleDelete(props.id)} className="transition rounded flex items-center justify-center w-full h-full" ><img src={trash} alt="Delete" className="lg:w-6 w-4 lg:h-6 h-4" /></button>
                    </div>
                )}
        </div>
    )
}