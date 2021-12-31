import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaSun, FaMoon} from 'react-icons/fa';
import { useGlobalContext } from "../context";

export default function Navbar() {
    const{theme,toggleTheme} = useGlobalContext();

    const scrollToTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop =0;
    }

    useEffect(()=>{
        if(theme==='dark'){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    },[theme])

    return (
        /*Navbar container*/
        <div id="nav-container" className="fixed flex items-center justify-between w-full z-10 top-0 shadow-md py-4 px-6 h-nav bg-white dark:bg-gray-600">
            <div className="flex justify-between items-center w-full lg:w-3/5 mx-auto my-0">
                <Link to="/"><span className="font-serif text-indigo-500 dark:text-indigo-100 font-medium text-3xl xsm:text-4xl">Cocktail Finder</span></Link>
                <ul className="flex text-sm xsm:text-base md:text-lg px-4">
                    <li className="hover:text-indigo-500 dark:text-indigo-100 dark:hover:text-white" onClick={()=>scrollToTop()}><Link to="/">Search</Link></li>
                    <li className="ml-4 hover:text-indigo-500 dark:text-indigo-100 dark:hover:text-white" onClick={()=>scrollToTop()}><Link to="/summerDrinks">Summer Drinks</Link></li>
                </ul>
                <div>{theme==='dark'? <FaSun className="cursor-pointer text-2xl dark:text-indigo-100 dark:hover:text-white" onClick={toggleTheme}/> : <FaMoon className="cursor-pointer text-2xl text-indigo-500 hover:text-indigo-400" onClick={toggleTheme}/>}</div>
            </div>
            
        </div>
    )
}
