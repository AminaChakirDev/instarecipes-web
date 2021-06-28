import InstagramIcon from '@material-ui/icons/Instagram';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function Recipe({instagramAuthor, preparationTime, title, poster, accessories, categories}) {

    return (
        <div className="recipe-main-container" key={title}>
            <div className="recipe-poster-container">
                <Image cloudName="dz632zpoz" publicId={poster} width="100" crop="scale" />
            </div>
            <div className="recipe-details-container">
                <div className="recipe-detail-container recipe-title">{title}</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><InstagramIcon/></span>@{instagramAuthor}</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><RestaurantIcon/></span>{categories[0].title}</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><AvTimerIcon/></span>{preparationTime}</div>
            </div>
        </div>
    )
}

export default Recipe;
