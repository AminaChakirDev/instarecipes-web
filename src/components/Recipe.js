import InstagramIcon from '@material-ui/icons/Instagram';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AvTimerIcon from '@material-ui/icons/AvTimer';

function Recipe({instagramAuthor, preparationTime, title}) {

    return (
        <div className="recipe-main-container" key={title}>
            <div className="recipe-poster-container">
                <img src='./photo_test.png' className="recipe-poster" alt="poster" />
            </div>
            <div className="recipe-details-container">
                <div className="recipe-detail-container recipe-title">{title}</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><InstagramIcon/></span>@{instagramAuthor}</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><RestaurantIcon/></span>Category</div>
                <div className="recipe-detail-container"><span className="recipe-icon"><AvTimerIcon/></span>{preparationTime}</div>
            </div>
        </div>
    )
}

export default Recipe;
