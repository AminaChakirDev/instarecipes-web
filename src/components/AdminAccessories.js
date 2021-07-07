import CreateAccessory from "./CreateAccessory";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ACCESSORIES = gql`
query getAccessories {
  getAccessories {
    _id
    title
    slug
    icon
  }
}
`;

function AdminAccessories() {

    const { loading, error, data } = useQuery(ACCESSORIES);

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Accessoires</h2>
                {
                    data && data.getAccessories ?
                        <table>
                            <caption>Liste des Accessoires</caption>
                            <tr>
                                <th>Voir</th>
                                <th>title</th>
                                <th>Icon</th>
                            </tr>
                            {
                                data.getAccessories.map(({
                                                             _id,
                                                             title,
                                                             icon,
                                                             slug
                                                         }) =>(
                                    <tr>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/admin/accessories/${slug}`,
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
            <CreateAccessory/>
        </div>
    );
}

export default AdminAccessories;

