import InstagramIcon from '@material-ui/icons/Instagram';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Image} from 'cloudinary-react';
import {useState} from "react";

function Recipe({instagramAuthor, preparationTime, title, poster, categories}) {

    const [favoriteSate, setFavoriteState] = useState(false);

    const handleClick = () => {
        setFavoriteState(!favoriteSate);
    }

    return (
        <div className="recipe-main-container" key={title}>
            <div className="recipe-poster-container">
                <Image className="recipe-poster" cloudName="dz632zpoz" publicId={poster} width="100" crop="scale" />
            </div>
            <div className="recipe-bottom">
                <div className="recipe-details-container">
                    <div className="recipe-detail-container recipe-title">{title}</div>
                    <div className="recipe-detail-container"><InstagramIcon/><span className="recipe-detail">@{instagramAuthor}</span></div>
                    <div className="recipe-detail-container"><RestaurantIcon/><span className="recipe-detail">{categories[0].title}</span></div>
                    <div className="recipe-detail-container"><AvTimerIcon/><span className="recipe-detail">{preparationTime}</span></div>
                </div>
                <div className="recipe-favorite-icon" onClick={()=>handleClick()}>{favoriteSate ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}</div>
            </div>
        </div>
    )
}

export default Recipe;
