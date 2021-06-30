import {
    useLocation
} from "react-router-dom";
import {Image} from "cloudinary-react";
import InstagramIcon from "@material-ui/icons/Instagram";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
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


