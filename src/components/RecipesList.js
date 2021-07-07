import { useQuery, gql } from '@apollo/client';
import Recipe from "./Recipe";
import {Link} from "react-router-dom";

const RECIPES = gql`
query getRecipes {
  getRecipes {
    _id
    title
    slug
    instagramUrl
    instagramAuthor
    preparationTime
    createdAt
    updatedAt
    onTop
    poster
    ingredients {
      _id
      title
      icon
      slug
    }
    accessories {
      _id
      title
      icon
      slug
    }
    categories {
      _id
      title
      icon
      slug
    }
  }
}
`;

function RecipesList() {

    const { loading, error, data } = useQuery(RECIPES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            { data && data.getRecipes ?
                data.getRecipes.map(({ title, slug, instagramAuthor, instagramUrl, preparationTime, poster, accessories, categories }) =>(
                    <Recipe title={title} slug={slug} instagramAuthor={instagramAuthor} instagramUrl={instagramUrl} preparationTime={preparationTime} accessories={accessories} categories={categories} poster={poster}/>
                ))
                : ""
            }
        </div>
    )
}

export default RecipesList;
