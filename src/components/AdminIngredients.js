import CreateIngredient from "./CreateIngredient";
import {gql, useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import {useState} from "react";

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
                                    data.getIngredients.map((ingredient) =>(
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
                <button onClick={()=>history.push("/admin")}>Retour au menu</button>
            </div>
            <button onClick={() => setShowCreate(true)}>Ajouter un ingrédient</button>
            <CreateIngredient showCreate={showCreate} onClose={() => setShowCreate(false)}/>

        </div>
    );
}

export default AdminIngredients;
