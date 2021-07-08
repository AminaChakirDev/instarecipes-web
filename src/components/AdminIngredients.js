import CreateIngredient from "./CreateIngredient";
import {gql, useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";

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

    let history = useHistory();

    const handleClick = (ingredient) => {
        history.push({
            pathname: `/admin/ingredients/${ingredient.slug}`,
            state: {
                ingredient: {ingredient}
            }
        })
    }

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
            </div>
            <CreateIngredient/>

        </div>
    );
}

export default AdminIngredients;
