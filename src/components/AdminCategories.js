import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CreateCategory from "./CreateCategory";

const CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    title
    icon
    slug
  }
}
`;

function AdminCategories() {

    const { loading, error, data } = useQuery(CATEGORIES);

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Catégories</h2>
                {
                    data && data.getCategories ?
                        <table>
                            <caption>Liste des Catégories</caption>
                            <tr>
                                <th>Voir</th>
                                <th>title</th>
                                <th>Icon</th>
                            </tr>
                            {
                                data.getCategories.map(({
                                                             _id,
                                                             title,
                                                             icon,
                                                             slug
                                                         }) =>(
                                    <tr>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/admin/categories/${slug}`,
                                                    state: {
                                                        accessory: {
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
            <CreateCategory/>
        </div>
    );
}

export default AdminCategories;

