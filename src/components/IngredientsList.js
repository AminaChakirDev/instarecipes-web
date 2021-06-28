import { useQuery, gql } from '@apollo/client';
import Ingredient from "./Ingredient";

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

    return data.getIngredients.map(({ title, icon }) =>(
        <Ingredient title={title} icon={icon}/>
    ));
}

export default IngredientsList;
