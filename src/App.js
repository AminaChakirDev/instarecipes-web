import './App.css';
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import IngredientsList from "./components/IngredientsList";
import AccessoriesList from "./components/AccessoriesList";
import CategoriesList from "./components/CategoriesList";
import RecipesList from "./components/RecipesList";
import Admin from "./components/Admin";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/ingredients">Ingredients</Link>
                    </li>
                    <li>
                        <Link to="/accessories">Accessories</Link>
                    </li>
                    <li>
                        <Link to="/categories">Categories</Link>
                    </li>
                    <li>
                        <Link to="/recipes">Recipes</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>

                <hr />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/ingredients">
                        <IngredientsList />
                    </Route>
                    <Route path="/accessories">
                        <AccessoriesList />
                    </Route>
                    <Route path="/categories">
                        <CategoriesList />
                    </Route>
                    <Route path="/recipes">
                        <RecipesList />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
