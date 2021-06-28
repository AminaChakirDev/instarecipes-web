import RecipesList from "./RecipesList";
import CreateRecipe from "./CreateRecipe";
import CreateIngredient from "./CreateIngredient";
import IngredientsList from "./IngredientsList";
import CategoriesList from "./CategoriesList";
import CreateCategory from "./CreateCategory";
import AccessoriesList from "./AccessoriesList";
import CreateAccessory from "./CreateAccessory";

function Home() {
    return (
        <div className="Home">
            <p className='home-title'>Recettes à la Une</p>
            <RecipesList/>
            <CreateRecipe/>
            <IngredientsList/>
            <CreateIngredient/>
            <CategoriesList/>
            <CreateCategory/>
            <AccessoriesList/>
            <CreateAccessory/>
        </div>
    );
}

export default Home;
