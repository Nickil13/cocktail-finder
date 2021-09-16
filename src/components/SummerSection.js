import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const searchCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export default function SummerSection({name,id,img,description}) {
    const [drinks,setDrinks] = useState([]);
    const [loading,setLoading] = useState(false);
    
    useEffect(()=>{
        const fetchDrinks = async () =>{
            setLoading(true);
            try{
                const response = await fetch(`${searchCocktailUrl}${name}`);
                const {drinks} = await response.json();
                let newDrinks = [];
                if(drinks){
                    newDrinks = drinks.map((drink)=>{
                        const{idDrink: id, strDrink: name, strDrinkThumb: img} = drink;
                        return(
                            {id,name,img}
                        );
                    })
                }
                setDrinks(newDrinks);
                setLoading(false);
            }catch(error){
                setLoading(false);
                console.log(error);
            }
        }
        fetchDrinks();
    },[name])
 
    return (
        <article className="grid md:grid-cols-2 w-full max-w-48 max-w-6xl mx-auto my-0 p-10" id={id}>
            <div className="self-center md:p-5 md:h-100">
                <img className="w-full h-80  object-cover" src={img} alt={name} />
            </div>
            <h2 className="text-center capitalize p-4 bg-pink-300 md:col-span-2 md:row-start-1">{name}</h2>
            <div className="p-5">
                <p className="text-gray-600 p-4 col-start-2">{description}</p>
                {loading ? <p>Loading recipes</p> : drinks.length>0 ?
                <div className="p-4 col-start-2">
                    <p className="mb-4 uppercase tracking-wider">{`${name} recipes to try:`}</p>
                    <ul className="grid grid-cols-2 text-pink-400">
                        {drinks.map((drink,index)=>{
                            return(
                                <li key={index} className="p-2 hover:text-pink-200"><Link to={`/cocktail/${drink.id}`}>{drink.name}</Link></li>
                                );
                            })}
                     </ul>
                </div> :
                <p>No recipes found.</p>}
            </div>
        </article>                            
    )
}
