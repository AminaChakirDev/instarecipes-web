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
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import logo from './logo.png';
import AdminRecipes from "./components/AdminRecipes";
import AdminIngredients from "./components/AdminIngredients";
import AdminCategories from "./components/AdminCategories";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import RecipeDetails from "./components/RecipeDetails";
import AdminAccessories from "./components/AdminAccessories";
import AdminRecipe from "./components/AdminRecipe";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <div className="header">
                    <div>
                        <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
                    </div>
                    <ul className="menu-container">
                        <li>
                            <Link to="/"><HomeIcon fontSize="large"/></Link>
                        </li>
                        <li>
                            <Link to="/search"><SearchIcon fontSize="large"/></Link>
                        </li>
                        <li>
                            <Link to="/favorites"><FavoriteIcon fontSize="large"/></Link>
                        </li>
                        <li>
                            <Link to="/admin"><SupervisorAccountIcon fontSize="large"/></Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/favorites">
                        <Favorites />
                    </Route>
                    <Route path="/recipes/:slug" component={RecipeDetails}/>
                    <Route path="/ingredients">
                        <IngredientsList />
                    </Route>
                    <Route path="/admin/ingredients">
                        <AdminIngredients />
                    </Route>
                    <Route path="/accessories">
                        <AccessoriesList />
                    </Route>
                    <Route path="/admin/accessories">
                        <AdminAccessories />
                    </Route>
                    <Route path="/categories">
                        <CategoriesList />
                    </Route>
                    <Route path="/admin/categories">
                        <AdminCategories />
                    </Route>
                    <Route path="/recipes">
                        <RecipesList />
                    </Route>
                    <Route path="/admin/recipes/:slug" component={AdminRecipe}/>
                    <Route path="/admin/recipes">
                        <AdminRecipes />
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
