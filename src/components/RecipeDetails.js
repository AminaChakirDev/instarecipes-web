import {useLocation} from "react-router-dom";
import {useState} from "react";

function RecipeDetails() {

    const location = useLocation();
    const {recipe} = location.state;

    const [favoriteSate, setFavoriteState] = useState(false);

    const handleClick = () => {
        setFavoriteState(!favoriteSate);
    }

    return (
        <div className="recipe-main-container" key={recipe.title}>
            <iframe
                src={recipe.instagramUrl}
                width="600"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="La page RecipeInsta de la recette"
                allowTransparency="true"
            >
            </iframe>
        </div>
    )
}

export default RecipeDetails;


