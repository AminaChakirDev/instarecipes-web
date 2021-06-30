import CreateRecipe from "./CreateRecipe";
import DeleteRecipe from "./DeleteRecipe";

function AdminRecipes() {
    return (
        <div className="admin-page">
            <h2>Gestion des recettes</h2>
            <CreateRecipe/>
            <DeleteRecipe/>
        </div>
    );
}

export default AdminRecipes;
