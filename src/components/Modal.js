import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from '../context';

export default function Modal() {
    const{closeModal,inspectedIngredient,loading} = useGlobalContext();
    const {name,type,abv,description} = inspectedIngredient;
    const[readMore,setReadMore] = useState(false);


    return (
        <div className="fixed grid place-items-center z-20 top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-70 h-screen">
                <div className="relative bg-white dark:bg-gray-600 border-4 border-gray-300 dark:border-indigo-100 text-center w-4/5 max-w-md lg:max-w-2xl py-20 rounded">
                    {loading? <p>Loading ingredient info</p> : inspectedIngredient ? <div>
                        <h2 className="dark:text-indigo-200">{name}</h2>

                        <span className="dark:text-indigo-300">{type && type}{abv && `-${abv}%`}</span>

                        <div className={`p-4 mx-4 mb-4 ${readMore && "overflow-y-scroll h-3/5 max-h-96"}`}>
                            {description ?(!readMore ? <p>{(description.split('\r\n\r\n')[0].length>200 ? `${description.split('\r\n\r\n')[0].substring(0,200)}...` : `${description.split('\r\n\r\n')[0]}`)}</p> : description.split('\r\n\r\n').map((paragraph,index)=>{
                            return <p key={index}>{paragraph}<br/><br/></p>
                        })) : <p>"No description"</p>
                            }</div>

                        {!readMore?<button className={`btn ${!description &&"hidden"}`} onClick={()=>{setReadMore(true)}}>Read More</button> :
                            
                        <button className="btn" onClick={()=>{setReadMore(false)}}>Read Less</button>
                        }
                              
                    </div> : <p>No ingredient information found.</p>        
                    }
                    
                    <span className="absolute top-0 right-0 p-4 cursor-pointer"
                    onClick={closeModal}><FaTimes className="text-indigo-500 dark:text-indigo-300"/></span>
                </div>     
        </div>
    )
}
