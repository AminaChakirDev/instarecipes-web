import CreateIngredient from "./CreateIngredient";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Ingredients</h2>
                {
                    data && data.getIngredients ?
                        <table>
                            <caption>Liste des ingrédients</caption>
                            <tr>
                                <th>Voir</th>
                                <th>title</th>
                                <th>Icon</th>
                            </tr>
                            {
                                data.getIngredients.map(({
                                                         _id,
                                                         title,
                                                         icon,
                                                         slug
                                                     }) =>(
                                    <tr>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/admin/ingredients/${slug}`,
                                                    state: {
                                                        ingredient: {
                                                            _id,
                                                            title,
                                                            icon,
                                                            slug,
                                                        }
                                                    }
                                                }}
                                            >
                                                <SearchIcon fontSize="small"/>
                                            </Link>
                                        </td>
                                        <td>{title}</td>
                                        <td>{icon}</td>
                                        <td><HighlightOffIcon fontSize="small"/></td>
                                    </tr>
                                ))
                            }
                        </table>
                        : ""
                }
            </div>
            <CreateIngredient/>

        </div>
    );
}

export default AdminIngredients;
