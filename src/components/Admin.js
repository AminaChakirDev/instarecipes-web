import {Link} from "react-router-dom";

function Admin() {
    return (
        <div className="Admin">
            <h2>Page Admin</h2>
            <div className="admin-buttons-container">
                <Link to="/admin/accessories">
                    <div className="admin-button">
                        Accessories
                    </div>
                </Link>
                <Link to="/admin/categories">
                    <div className="admin-button">
                        Categories
                    </div>
                </Link>
                <Link to="/admin/ingredients">
                    <div className="admin-button">
                        Ingredients
                    </div>
                </Link>
                <Link to="/admin/recipes">
                    <div className="admin-button">
                        Recipes
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Admin;
