import React, { useState, useEffect } from 'react';
import CocktailProfile from '../components/CocktailProfile';
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useParams} from 'react-router';
import { useGlobalContext } from '../context';
import { VscClose } from 'react-icons/vsc';
import { MdHelpOutline } from 'react-icons/md';


const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export default function Cocktail() {
    const {id} = useParams();
    const[currentCocktail,setCurrentCocktail] = useState(null);
    const[loading,setLoading] = useState(false);
    const[tooltipActive, setTooltipActive] = useState(true);
    const {getIngredients,isModalShowing} = useGlobalContext()
   
    useEffect(()=>{
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
        if(!currentCocktail || currentCocktail.id!==id){
            fetchCocktail();
        }
        
    },[id, getIngredients, currentCocktail])
    
    useEffect(()=>{
        if(localStorage.getItem('tooltip')==='false'){
            setTooltipActive(false);
        }
    },[])

    const closeTooltip = () =>{
        setTooltipActive(false);
        localStorage.setItem('tooltip', 'false');
    }

    const openTooltip = () =>{
        setTooltipActive(true);
        localStorage.setItem('tooltip', 'true');
    }

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 h-10 ">
                {tooltipActive ? <div className="flex p-2 bg-indigo-500 tooltip transition ease-in-out duration-300">
                    <span className="text-indigo-100">Don't recognize an ingredient? Click it for more info!</span>
                    <VscClose className="ml-5 cursor-pointer text-white text-2xl" onClick={closeTooltip}/>
                </div> :
                <div className="p-4 text-indigo-400 text-3xl hover:text-indigo-200 dark:hover:text-indigo-500 cursor-pointer">
                    <MdHelpOutline onClick={openTooltip}/>
                </div>}
            </div>
            <div className="grid place-items-center content-container">
                {loading ? <Loading/> : currentCocktail==null ?
                <h2 className="text-center text-4xl p-10 text-indigo-400">No cocktail found</h2> : 
                <CocktailProfile {...currentCocktail} tooltipActive={tooltipActive} closeTooltip={closeTooltip}/>
                }
            </div>
             

             {isModalShowing && <Modal/>}
             
        </div>
    )
}
