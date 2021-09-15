import React from 'react';
import {useHistory} from 'react-router-dom';

export default function CocktailCard({cocktail}) {
    const{name,id,ingredients,img} = cocktail;
    const history = useHistory();

    const handleClick = () =>{
      history.push(`/cocktail/${id}`);
    }

    return (
        <div className="grid grid-rows-2 grid-cols-2 justify-center w-4/5 max-w-xl shadow-md my-2 mx-auto cursor-pointer"
              onClick={handleClick}
              >
                <img className="object-contain self-center row-span-2" src={img} alt={name}/>
                <div className="row-span-2 self-center p-4 mx-2  bg-indigo-300">
                  <h3 className="mb-4">{name}</h3>
                  <ul className="text-gray-600">
                      {ingredients.map((ingredient,index)=>{
                        const{name} = ingredient;
                        return(
                          <li key={index}>{name}</li>
                        )
                      })}
                  </ul>
                </div>
                
        </div>
    )
}
