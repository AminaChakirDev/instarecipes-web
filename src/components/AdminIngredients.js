import CreateIngredient from "./CreateIngredient";
import {gql, useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import AddIcon from "@material-ui/icons/Add";

const INGREDIENTS = gql`
query getIngredients {
  getIngredients {
    _id
    title
    icon
    slug
  }
}
`;

function AdminIngredients() {

    const { loading, error, data } = useQuery(INGREDIENTS);

    const [showCreate, setShowCreate] = useState(false);

    const [searchedValue, setSearchedValue] = useState([]);

    let history = useHistory();

    const handleClick = (ingredient) => {
        history.push({
            pathname: `/admin/ingredients/${ingredient.slug}`,
            state: {
                ingredient: {ingredient}
            }
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Ingredients</h2>
                <input
                    type="text"
                    onChange={(e)=>setSearchedValue(e.target.value)}
                    placeholder="Rechercher un ingrédient"
                />
                <button className="admin-page-add-button" onClick={() => setShowCreate(true)}><AddIcon/></button>
                {
                    data && data.getIngredients ?
                        <table>
                            <thead>
                            <tr>
                                <th>title</th>
                                <th>Icon</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.getIngredients
                                    .filter((recipe)=> searchedValue && searchedValue.length > 0 ? recipe.title.toLowerCase().includes(searchedValue.toLowerCase()) : recipe.title.includes(searchedValue))
                                    .map((ingredient) =>(
                                    <tr key={ingredient._id} onClick={() => handleClick(ingredient)}>
                                        <td>{ingredient.title}</td>
                                        <td>{ingredient.icon}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        : ""
                }
            </div>
            <CreateIngredient showCreate={showCreate} onClose={() => setShowCreate(false)}/>

        </div>
    );
}

export default AdminIngredients;
