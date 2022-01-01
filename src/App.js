import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import Search from './pages/Search';
import Cocktail from './pages/Cocktail';
import SummerDrinks from './pages/SummerDrinks';
import Navbar from './components/Navbar';

const ScrollToTop = (props) =>{
  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname]);

  return props.children;
}

function App() {
  return(
    <Router>
      <ScrollToTop>
        <Navbar/>
        <main className="my-0 mx-auto content-container text-center mt-nav dark:bg-gray-800">
          <Switch>
            <Route exact path ="/"><Search/></Route>
            <Route path="/cocktail/:id"><Cocktail/></Route>
            <Route path="/summerDrinks"><SummerDrinks/></Route>
          </Switch>
        </main> 
      </ScrollToTop>
    </Router>
  );
 
}

export default App;
