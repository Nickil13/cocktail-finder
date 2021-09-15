import React from 'react';
import {Link} from 'react-router-dom';
import {FiSun, FiMoon} from 'react-icons/fi';
import { useGlobalContext } from "../context";

export default function Navbar() {
    const{darkMode,setDarkMode} = useGlobalContext();

    const scrollToTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop =0;
    }
    return (
        /*Navbar container*/
        <div className="sticky z-10 top-0 shadow-md p-4 bg-white">
            <div className="flex justify-between items-center lg:w-4/5 mx-auto my-0">
                <Link to="/"><span className="text-indigo-500 font-medium text-2xl">Cocktail Finder</span></Link>
                <ul className="flex">
                    <li className="hover:text-indigo-500" onClick={()=>scrollToTop()}><Link to="/">Search</Link></li>
                    <li className="ml-4 hover:text-indigo-500" onClick={()=>scrollToTop()}><Link to="/summerDrinks">Summer Drinks</Link></li>
                </ul>
                <div>{darkMode? <FiSun/> : <FiMoon/>}</div>
            </div>
            
        </div>
    )
}
