import React, { useState, useEffect } from 'react';
import CocktailProfile from '../components/CocktailProfile';
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useParams} from 'react-router';
import { useGlobalContext } from '../context';


const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export default function Cocktail() {
    const {id} = useParams();
    const[currentCocktail,setCurrentCocktail] = useState(null);
    const[loading,setLoading] = useState(false);
    const {getIngredients,isModalShowing} = useGlobalContext();
    
    useEffect(()=>{
        fetchCocktail();
    },[])

    const fetchCocktail = async () => {
        setLoading(true);
        try{
            const response = await fetch(`${url}${id}`);
            const data = await response.json();
            const {drinks} = data;

            if(drinks[0]){
                const {idDrink: id, strDrink: name, strDrinkThumb: img, strInstructions: instructions} = drinks[0];
                const ingredients = getIngredients(drinks[0]);
                const newCocktail = {id,name,img,ingredients,instructions};
                
                setCurrentCocktail(newCocktail);
            }else{
                setCurrentCocktail(null);
            }
            setLoading(false);
        }catch(error){
            setLoading(false);
            console.log(error);
            throw new Error("Failed to fetch cocktail by ID");
            
        }
    }
    
    if(loading){
        return <Loading/>
    }
    return (
        <div>
             {currentCocktail==null ?
             <h1 className="text-center text-2xl p-10">No cocktail found</h1> : 
             <CocktailProfile cocktail = {currentCocktail}/>
             }
             {isModalShowing && <Modal/>}
        </div>
    )
}
