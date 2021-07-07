import CreateIngredient from "./CreateIngredient";
import UploadPoster from "./UploadPoster";

function AdminIngredients() {
    return (
        <div>
            <h2>Page Admin Ingredients</h2>
            <CreateIngredient/>

            <UploadPoster />
        </div>
    );
}

export default AdminIngredients;
