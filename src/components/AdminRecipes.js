import CreateRecipe from "./CreateRecipe";
import UploadPoster from "./UploadPoster";
import DeleteRecipe from "./DeleteRecipe";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function AdminRecipes() {
    return (
        <div className="admin-page">
            <h2>Gestion des recettes</h2>

            <Link to="/admin">
                <div className="back-button-container">
                    <ArrowBackIcon/>
                    <span>Retour vers la page admin</span>
                </div>
            </Link>

            <CreateRecipe/>
            <DeleteRecipe/>

            <UploadPoster />
        </div>
    );
}

export default AdminRecipes;
