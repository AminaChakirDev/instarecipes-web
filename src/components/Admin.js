import CreateIngredient from "./CreateIngredient";
import CreateCategory from "./CreateCategory";
import CreateAccessory from "./CreateAccessory";
import UploadPoster from "./UploadPoster";
import CreateRecipe from "./CreateRecipe";
import DeleteRecipe from "./DeleteRecipe";
import DeleteIngredient from "./DeleteIngredient";
import DeleteAccessory from "./DeleteAccessory";

function Admin() {
    return (
        <div className="Admin">
            <p className='home-title'>Page Admin</p>

            <CreateIngredient/>
            <DeleteIngredient/>
            <CreateCategory/>
            <CreateAccessory/>
            <DeleteAccessory/>
            <CreateRecipe/>
            <DeleteRecipe/>
            <UploadPoster />
        </div>
    );
}

export default Admin;
