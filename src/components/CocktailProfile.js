import React from 'react';
import {useGlobalContext} from '../context';


const CocktailProfile = ({name,instructions,ingredients,img,tooltipActive,closeTooltip}) =>{
    const {showModal} = useGlobalContext();
 
    const handleIngredientClick = (name) =>{
        showModal(name);
        if(tooltipActive){
            closeTooltip();
        }
    }
    return(
        <div className="grid justify-items-center mx-auto p-5 lg:p-10 lg:grid-cols-2 w-full max-w-md md:max-w-lg lg:max-w-6xl">
            <img className="rounded" src={img} alt={name} />
            <div className="p-6 md:p-10">
                <h2 className="text-center text-indigo-500 mb-5">{name}</h2>
                <ul className="dark:text-indigo-200">
                    {ingredients.map((ingredient,index)=>{
                         const{name,measurement} = ingredient;
                        return(
                             <li key={index}
                             onClick={()=>{handleIngredientClick(name)}}>
                                <span className="font-bold">{measurement}</span>
                                <p className="inline cursor-pointer hover:text-indigo-500 dark:hover:text-white"> {name}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-5 text-gray-600 dark:text-gray-400">{instructions}</p>
             </div>       
        </div>          
    )
}

export default CocktailProfile;