import { useQuery, gql } from '@apollo/client';
import Accessory from "./Accessory";
import {Link} from "react-router-dom";
import Category from "./Category";

const ACCESSORIES = gql`
query getAccessories {
  getAccessories {
    _id
    title
    icon
  }
}
`;

function AccessoriesList() {

    const { loading, error, data } = useQuery(ACCESSORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Link to="/admin">Retour vers la page admin</Link>
            {
                data.getAccessories.map(({ title, icon }) =>(
                    <Accessory title={title} icon={icon}/>
                ))
            }
        </div>
    )
}

export default AccessoriesList;
