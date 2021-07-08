import CreateAccessory from "./CreateAccessory";
import {gql, useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import {useState} from "react";

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

    const [showCreate, setShowCreate] = useState(false);

    let history = useHistory();

    const handleClick = (accessory) => {
        history.push({
            pathname: `/admin/accessories/${accessory.slug}`,
            state: {
                accessory: {accessory}
            }
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Accessoires</h2>
                {
                    data && data.getAccessories ?
                        <table>
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>Icon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.getAccessories.map((accessory) =>(
                                        <tr key={accessory._id} onClick={() => handleClick(accessory)}>
                                            <td>{accessory.title}</td>
                                            <td>{accessory.icon}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        : ""
                }
                <button onClick={()=>history.push("/admin")}>Retour au menu</button>
            </div>
            <button onClick={() => setShowCreate(true)}>Ajouter une recette</button>
            <CreateAccessory showCreate={showCreate} onClose={() => setShowCreate(false)}/>
        </div>
    );
}

export default AdminAccessories;

