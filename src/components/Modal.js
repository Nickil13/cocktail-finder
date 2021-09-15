import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from '../context';

export default function Modal() {
    const{closeModal,inspectedIngredient,loading} = useGlobalContext();
    const[readMore,setReadMore] = useState(false);

    return (
        <div className="fixed flex items-center justify-center z-20 top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-70 h-screen">
                <div className="relative bg-white text-center w-4/5 max-w-md lg:max-w-2xl py-20">
                    {loading? <p>Loading ingredient info</p> :
                    <div>
                        {inspectedIngredient &&
                        <div className="">
                            <h2>{inspectedIngredient.name}</h2>

                            <span>{inspectedIngredient.type && inspectedIngredient.type}{inspectedIngredient.abv && `-${inspectedIngredient.abv}%`}</span>

                            <p className={`p-4 text-gray-600 ${readMore && "overflow-y-scroll h-3/5 max-h-96"}`}>{inspectedIngredient.description ?(!readMore ? `${inspectedIngredient.description.substring(0,200)}...` : inspectedIngredient.description) : "No description"
                            }</p>

                            {!readMore?<button className={`btn ${!inspectedIngredient.description &&"hidden"}`} onClick={()=>{setReadMore(true)}}>Read More</button> :
                            <button className="btn" onClick={()=>{setReadMore(false)}}>Read Less</button>
                            }
                            
                            
                        </div>}
                    </div>
                    }
                     <span className="absolute top-0 right-0 p-4 cursor-pointer"
                     onClick={closeModal}><FaTimes className="text-indigo-500"/></span>
                </div>
                 
        </div>
    )
}
