import { useQuery, gql } from '@apollo/client';
import Ingredient from "./Ingredient";
import {Link} from "react-router-dom";

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

function IngredientsList() {

    const { loading, error, data } = useQuery(INGREDIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {
                data && data.getIngredients.map(({ title, icon, slug }) =>(
                    <Ingredient title={title} icon={icon} slug={slug}/>
                ))
            }
        </div>
    )
}

export default IngredientsList;
