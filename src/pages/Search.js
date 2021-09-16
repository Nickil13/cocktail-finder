import React, { useState } from 'react';
import Loading from '../components/Loading';
import CocktailCard from '../components/CocktailCard';
import {useGlobalContext} from "../context";

export default function Search() {
    const{cocktails,loading,search,error} = useGlobalContext();
    const[searchType,setSearchType] = useState("name");

    const handleSubmit = (e) =>{
        e.preventDefault();
        let inputValue = document.getElementById("searchForm").searchBar.value;
        search(searchType, inputValue);
    }
    
    return (
        <div>
                <div className="bg-hero-background hero">
                    <h1 className="text-white mb-4">Find a Cocktail</h1>
                    <p className="p-2 text-xl text-white dark:text-white">Looking for a specific cocktail or have an ingredient on hand?</p>
                    <ul className="flex flex-wrap justify-center">
                        <li className={`btn ${searchType==="name" && "btn-active"}`} onClick={()=>{setSearchType("name")}}>By Name</li>
                        <li className={`btn ${searchType==="ingredient" && "btn-active"}`} onClick={()=>{setSearchType("ingredient")}}>By Ingredient</li>
                    </ul>
                    <form className="pt-10" id="searchForm" onSubmit={handleSubmit}>
                        <input className="border-2 border-indigo-600 py-2 px-1 rounded text-center w-full sm:w-4/5 max-w-xl focus: outline-none dark:bg-gray-600 dark:border-indigo-100 dark:text-indigo-200" type="text" name="searchBar" autoComplete="off" placeholder={searchType==="name"? "cocktail name" : "your ingredient"} ></input>
                    </form>
                </div>
                
                
                {/* Search Results */}
                {loading ? <Loading/> : error ? <p className="p-5">{error}</p> : 
                <div className="grid place-items-center grid-cols-1 gap-5 lg:grid-cols-2 p-10 w-full max-w-7xl mx-auto">
                    {cocktails.length<1 ? <p className="col-span-2">No cocktails found that match that criteria</p> : cocktails.map((cocktail)=>{
                        return(
                            <CocktailCard key={cocktail.id}cocktail={cocktail}/>
                        );
                        
                    })}
                </div>}
                
            
        </div>
    )
}
