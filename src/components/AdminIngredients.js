import CreateIngredient from "./CreateIngredient";
import UploadPoster from "./UploadPoster";
import DeleteIngredient from "./DeleteIngredient";
import {Link} from "react-router-dom";

function AdminIngredients() {
    return (
        <div>
            <h2>Page Admin Ingredients</h2>

            <Link to="/admin">Retour vers la page admin</Link>

            <CreateIngredient/>
            <DeleteIngredient/>

            <UploadPoster />
        </div>
    );
}

export default AdminIngredients;
