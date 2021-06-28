import RecipesList from "./RecipesList";
import CreateRecipe from "./CreateRecipe";
import CreateIngredient from "./CreateIngredient";
import IngredientsList from "./IngredientsList";
import CategoriesList from "./CategoriesList";
import CreateCategory from "./CreateCategory";
import AccessoriesList from "./AccessoriesList";
import CreateAccessory from "./CreateAccessory";
import UploadPoster from "./UploadPoster";

function Home() {
    return (
        <div className="Home">
            <p className='home-title'>Créer une recette</p>

            <CreateIngredient/>
            <CreateCategory/>
            <CreateAccessory/>
            <UploadPoster />
        </div>
    );
}

export default Home;
