import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './pages/Search';
import Cocktail from './pages/Cocktail';
import SummerDrinks from './pages/SummerDrinks';


function App() {

  return(
    <Router>
      <Switch>
        <Route exact path ="/"><Search/></Route>
        <Route path="/cocktail/:id"><Cocktail/></Route>
        <Route path="/summerDrinks"><SummerDrinks/></Route>
      </Switch>
    </Router>
  );
 
}

export default App;
