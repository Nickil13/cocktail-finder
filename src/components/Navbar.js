import React, { useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiSun, FiMoon} from 'react-icons/fi';
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
        <div id="nav-container" className="fixed w-full z-10 top-0 shadow-md p-4 bg-white dark:bg-gray-600">
            <div className="flex justify-between items-center lg:w-4/5 mx-auto my-0">
                <Link to="/"><span className="text-indigo-500 dark:text-indigo-100 font-medium text-2xl">Cocktail Finder</span></Link>
                <ul className="flex">
                    <li className="hover:text-indigo-500 dark:text-indigo-100 dark:hover:text-white" onClick={()=>scrollToTop()}><Link to="/">Search</Link></li>
                    <li className="ml-4 hover:text-indigo-500 dark:text-indigo-100 dark:hover:text-white" onClick={()=>scrollToTop()}><Link to="/summerDrinks">Summer Drinks</Link></li>
                </ul>
                <div>{theme==='dark'? <FiSun className="cursor-pointer text-xl dark:text-indigo-100" onClick={toggleTheme}/> : <FiMoon className="cursor-pointer text-md dark:text-indigo-100" onClick={toggleTheme}/>}</div>
            </div>
            
        </div>
    )
}
