import React from 'react';
import {Link} from 'react-router-dom';

export default function SummerSection({drinks,category}) {
    const{name,id,img,description} = category;
    
    return (
        <article className="grid md:grid-cols-2 w-full max-w-48 max-w-6xl mx-auto my-0 p-10" id={id}>
            <div className="self-center md:p-5 md:h-100">
                <img className="w-full h-80  object-cover" src={img} alt={name} />
            </div>
            <h2 className="text-center capitalize p-4 bg-indigo-300 md:col-span-2 md:row-start-1">{name}</h2>
            <div className="p-5">
                <p className="text-gray-600 p-4 col-start-2">{description}</p>
                {drinks ?
                <div className="p-4 col-start-2">
                    <p className="mb-4 uppercase tracking-wider">{`${name} recipes to try:`}</p>
                    <ul className="grid grid-cols-2">
                        {drinks.map((drink,index)=>{
                            return(
                                <li key={index} className="p-2 hover:text-indigo-500"><Link to={`/cocktail/${drink.id}`}>{drink.name}</Link></li>
                                );
                            })}
                     </ul>
                </div> :
                <p>no drinks</p>}
            </div>
            
                    
            
            
            {/* {drinks ? 
                <div className="grid grid-cols-2 gap-4 p-4 justify-center
                md:grid-cols-3 lg:grid-flow-col lg:grid-cols-none">
                    {drinks.map((drink,index)=>{
                        return(
                            <div className="relative"key={index}>
                                <img className="w-full max-w-xs" src={drink.img} alt={drink.name} />
                                <div className="bg-indigo-300 absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center invisible hover:visible">
                                    <p className="text-center">{drink.name}</p>
                                </div>
                                            
                            </div>
                                        
                        );
            })}</div> : 
            <p>no drinks</p>} */}

        </article>
                               
    )
}
