import { useQuery, gql } from '@apollo/client';
import Ingredient from "./Ingredient";
import {Link} from "react-router-dom";

const INGREDIENTS = gql`
query getIngredients {
  getIngredients {
    _id
    title
    icon
  }
}
`;

function IngredientsList() {

    const { loading, error, data } = useQuery(INGREDIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Link to="/admin">Retour vers la page admin</Link>
            {
                data && data.getIngredients.map(({ title, icon }) =>(
                    <Ingredient title={title} icon={icon}/>
                ))
            }
        </div>
    )
}

export default IngredientsList;
