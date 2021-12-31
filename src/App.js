import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './pages/Search';
import Cocktail from './pages/Cocktail';
import SummerDrinks from './pages/SummerDrinks';
import Navbar from './components/Navbar';

function App() {
  return(
    <Router>
      <Navbar/>
      <main className="my-0 mx-auto content-container text-center mt-nav dark:bg-gray-800">
        <Switch>
          <Route exact path ="/"><Search/></Route>
          <Route path="/cocktail/:id"><Cocktail/></Route>
          <Route path="/summerDrinks"><SummerDrinks/></Route>
        </Switch>
      </main> 
    </Router>
  );
 
}

export default App;
