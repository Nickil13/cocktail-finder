import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import CocktailCard from '../components/CocktailCard';
import {useGlobalContext} from "../context";

export default function Search() {
    const{cocktails,loading,search} = useGlobalContext();
    const[searchType,setSearchType] = useState("name");

    const handleSubmit = (e) =>{
        e.preventDefault();
        let inputValue = document.getElementById("searchForm").searchBar.value;
        search(searchType, inputValue);
    }
    
    return (
        <div>
            <Navbar/>
            <main className="my-0 mx-auto text-center h-auto">
                <div className="bg-hero-background hero">
                    <h1 className="text-white mb-4">Find a Cocktail</h1>
                    <p className="p-2 text-xl text-white">Looking for a specific cocktail or have an ingredient on hand?</p>
                    <ul className="flex justify-center">
                        <li className={`btn ${searchType==="name" && "btn-active"}`} onClick={()=>{setSearchType("name")}}>By Name</li>
                        <li className={`btn ${searchType==="ingredient" && "btn-active"}`} onClick={()=>{setSearchType("ingredient")}}>By Ingredient</li>
                    </ul>
                    <form className="pt-10" id="searchForm" onSubmit={handleSubmit}>
                        <input className="border-2 border-indigo-600 py-2 px-1 rounded w-4/5 max-w-lg text-center focus: outline-none" type="text" name="searchBar" autoComplete="off" placeholder={searchType=="name"? "cocktail name" : "your ingredient"} ></input>
                    </form>
                </div>
                
                
                {/* Search Results */}
                {loading ? <Loading/> : 
                <div className="grid grid-cols-1 lg:grid-cols-2 p-10">
                    {cocktails.length<1 ? <div>No cocktails found that match that criteria</div> : cocktails.map((cocktail)=>{
                        return(
                            <CocktailCard key={cocktail.id}cocktail={cocktail}/>
                        );
                        
                    })}
                </div>}
                
            </main>
        </div>
    )
}
