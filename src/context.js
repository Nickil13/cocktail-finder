import React, {useState, useEffect,useContext} from'react';

const AppContext = React.createContext();
const searchCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const searchIngredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const ingredientUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=";

export const AppProvider = ({children}) => {
    const[cocktails,setCocktails] = useState([]);
    const[loading,setLoading] = useState(false);
    const[isModalShowing,setIsModalShowing] = useState(false);
    const[error,setError] = useState('');
    const[inspectedIngredient,setInspectedIngredient] = useState({});
    const[theme,setTheme] = useState('light');
    
    //Get the default list of cocktails.
    useEffect(()=>{
        fetchCocktailsByName('');
    },[])

    useEffect(()=>{
        if(localStorage.getItem('theme')){
            setTheme(localStorage.getItem('theme'));
        }
    },[])

    const toggleTheme = () =>{
        if(theme==='light'){
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }else if(theme==='dark'){
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }
    const showModal = (ingredientName) => {
        //Show the Modal
        setIsModalShowing(true);
        //Fetch ingredient information and set inspected ingredient
        fetchIngredient(ingredientName);
    }
    const closeModal = () =>{
        setIsModalShowing(false);
    }

    // Fetch methods
    const fetchIngredient = async (ingredientName) =>{
        setLoading(true);
        try{
            const response = await fetch(`${ingredientUrl}${ingredientName}`);
            const data = await response.json();
            if(data){
                const ingredient = data.ingredients[0];
                const{strIngredient: name, strDescription: description, strType: type,strABV: abv} = ingredient;
                const newIngredient = {name,description,type,abv};
                setInspectedIngredient(newIngredient);
            }else{
                setInspectedIngredient(null);
            }
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
            setError("No ingredient information found.")
        }
    }
    const fetchCocktailsByIngredient = async (searchValue) =>{
        let ingredient = null;
        setLoading(true);
        // Check to see if the ingredient exists
        try{
            const response = await fetch(`${ingredientUrl}${searchValue}`);
            const data = await response.json();
            if(data.ingredients){
                console.log(data);
                ingredient = data.ingredients[0];
                console.log(ingredient);
            }
            setLoading(false);
        }catch(error){
            setLoading(false);
            setError("No ingredients that match that criteria.");
        }
        // Use that ingredient to search for drinks
        if(ingredient){
            let fetchUrl = `${searchIngredientUrl}${ingredient.strIngredient}`;
            try{
                const response  = await fetch(fetchUrl);
                const data = await response.json();
                const {drinks} = data;
                if(drinks){
                    const newCocktails = drinks.map((drink)=>{
                        const {idDrink,strDrink,strDrinkThumb,strInstructions} = drink;
                        const ingredients = getIngredients(drink);
                        return(
                            {id: idDrink, name: strDrink, img: strDrinkThumb, ingredients:ingredients, instructions: strInstructions}
                        );
                    })
                    setCocktails(newCocktails);
                }else{
                    setCocktails([]);
                }
                setLoading(false);
            }catch (error){
                setLoading(false);
                setError("No drinks with that ingredient.");
            }
        }else{
            setCocktails([]);
        }
        
    }
    const fetchCocktailsByName = async (searchValue) =>{
        setLoading(true);
        try{
            const response  = await fetch(`${searchCocktailUrl}${searchValue}`);
            const data = await response.json();
            const {drinks} = data;
            if(drinks){
                const newCocktails = drinks.map((drink)=>{
                    const {idDrink,strDrink,strDrinkThumb,strInstructions} = drink;
                    const ingredients = getIngredients(drink);
                    return(
                        {id: idDrink, name: strDrink, img: strDrinkThumb, ingredients:ingredients, instructions: strInstructions}
                    );
                })
                setCocktails(newCocktails);
            }else{
                setCocktails([]);
            }
            setLoading(false);
        }catch (error){
            console.log(error);
            setLoading(false);
            setError("No drinks with that name.");  
        }
        
    }
    
    const search = (type,searchValue) =>{
        if(type==="ingredient"){
            fetchCocktailsByIngredient(searchValue);
        }else{
            fetchCocktailsByName(searchValue);
        }
    }
    
    const getIngredients = (cocktail) =>{
        let ingredients = [];
        let name = cocktail["strIngredient1"];
        let measurement = cocktail["strMeasure1"];
        let ingredient = {name,measurement};
        let index = 2;
        
        while(name!==null &&index<15){
            ingredients.push(ingredient);

            name = cocktail[`strIngredient${index.toString()}`];
            measurement = cocktail[`strMeasure${index.toString()}`];
            
            if(!measurement){
                measurement="";
            }

            ingredient = {name, measurement};
            index++;
        }
        //Use a new set in order to remove duplicates
        return [...new Set(ingredients)];
    }


    return <AppContext.Provider 
    value={{
        cocktails,
        search,
        error,
        loading,
        getIngredients,
        isModalShowing,
        showModal,
        closeModal,
        inspectedIngredient,
        theme,
        toggleTheme
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}