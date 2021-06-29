import CreateCategory from "./CreateCategory";
import UploadPoster from "./UploadPoster";
import DeleteCategory from "./DeleteCategory";
import {Link} from "react-router-dom";

function AdminCategories() {
    return (
        <div>
            <h2>Page Admin Categories</h2>

            <Link to="/admin">Retour vers la page admin</Link>

            <CreateCategory/>
            <DeleteCategory/>

            <UploadPoster />
        </div>
    );
}

export default AdminCategories;
