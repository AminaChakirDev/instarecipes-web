import { useQuery, gql } from '@apollo/client';
import Recipe from "./Recipe";

const RECIPES = gql`
query getRecipes {
  getRecipes {
    _id
    title
    instagramUrl
    instagramAuthor
    preparationTime
    ingredients {
      title
      icon
    }
  }
}
`;

function RecipesList() {

    const { loading, error, data } = useQuery(RECIPES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.getRecipes.map(({ title, instagramAuthor, preparationTime }) =>(
        <Recipe title={title} instagramAuthor={instagramAuthor} preparationTime={preparationTime} />
    ));
}

export default RecipesList;
