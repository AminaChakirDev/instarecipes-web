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

function RecipeDetails(props) {

    const location = useLocation();
    const {recipe} = location.state;

    const [favoriteSate, setFavoriteState] = useState(false);

    const handleClick = () => {
        setFavoriteState(!favoriteSate);
    }

    return (
        <div className="recipe-main-container" key={recipe.title}>
            <div className="recipe-poster-container">
                <Image className="recipe-poster" cloudName="dz632zpoz" publicId={recipe.poster} width="100" crop="scale" />
            </div>
            <div className="recipe-bottom">
                <div className="recipe-details-container">
                    <div className="recipe-detail-container recipe-title">{recipe.title}</div>
                    <div className="recipe-detail-container"><InstagramIcon/><span className="recipe-detail">@{recipe.instagramAuthor}</span></div>
                    <div className="recipe-detail-container"><RestaurantIcon/><span className="recipe-detail">{recipe.categories[0].title}</span></div>
                    <div className="recipe-detail-container"><AvTimerIcon/><span className="recipe-detail">{recipe.preparationTime}</span></div>
                </div>
                <div className="recipe-favorite-icon" onClick={()=>handleClick()}>{favoriteSate ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}</div>
            </div>
        </div>
    )
}

export default RecipeDetails;
