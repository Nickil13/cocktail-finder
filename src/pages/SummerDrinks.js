import React from 'react';
import Loading from '../components/Loading';
import SummerSection from '../components/SummerSection';
import {drinkData as categories}  from '../drinkData';
import {useGlobalContext} from '../context';


export default function SummerDrinks() {
    const{summerDrinks,loading} = useGlobalContext();


    const handleLinkScroll = (e) => {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        const location = document.querySelector(target).offsetTop;
        const navHeight = document.getElementById("nav-container").getBoundingClientRect().height;
        window.scrollTo({
            left:0,
            top: location-navHeight
        })
    }
    const getDrinkList = (name) =>{
        const item = summerDrinks.filter((drink)=>drink.category === name);
        console.log(summerDrinks.length);
        if(item.length>0){
            const {drinks} = item[0];
            return drinks;
        }
        return [];
        
    }   
    if(loading){
        return <Loading/>
    }
    return (
        <div>
            
                <div className="bg-summer-background hero">
                    <h1 className="text-white mb-4">Summer Drinks</h1>
                    <p className="p-2 text-xl text-white">These drinks are perfect for a warm summer day!</p>
                    <ul className="flex flex-wrap justify-center">
                        {categories.map((category,index)=>{
                            return(
                                <li key={index} className="btn btn-drink capitalize" onClick={handleLinkScroll}><a href={`#${category.id}`}>{category.name}</a></li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    {categories.map((category,index)=>{
                        const drinks = getDrinkList(category.name);
                        
                        return(
                            <SummerSection key={index} drinks={drinks} category={category}/>
                            
                        )
                    })}
                </div>
            
        </div>
    )
}
