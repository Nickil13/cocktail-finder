import React from 'react';
import {useGlobalContext} from '../context';


const CocktailProfile = ({cocktail}) =>{
    const {name,instructions,ingredients,img} = cocktail;
    const {showModal} = useGlobalContext();
 
    const handleIngredientClick = (name) =>{
        showModal(name);
    }
    return(
        <div className="grid justify-items-center my-10 mx-auto lg:p-10 lg:grid-cols-2 w-full max-w-md md:max-w-lg lg:max-w-6xl">
            <img src={img} alt={name} />
            <div className="p-10 ">
                <h2 className="text-center text-indigo-500 mb-5">{name}</h2>
                <ul className="">
                    {ingredients.map((ingredient,index)=>{
                         const{name,measurement} = ingredient;
                        return(
                             <li key={index}
                             onClick={()=>{handleIngredientClick(name)}}>
                                <span className="font-bold">{measurement}</span>
                                <p className="inline cursor-pointer hover:text-indigo-500"> {name}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-5 text-gray-600">{instructions}</p>
             </div>
                
                
        </div>          
    )
}

export default CocktailProfile;