import { useQuery, gql } from '@apollo/client';
import Recipe from "./Recipe";
import {Link} from "react-router-dom";

const RECIPES = gql`
query getRecipes {
  getRecipes {
    _id
    title
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
    }
    accessories {
      _id
      title
      icon
    }
    categories {
      _id
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

    return (
        <div>
            {
                data.getRecipes.map(({ title, instagramAuthor, preparationTime, poster, accessories, categories }) =>(
                    <Link
                        to={{
                            pathname: `/recipes/${title}`,
                            state: {
                                recipe: {
                                    title,
                                    instagramAuthor,
                                    preparationTime,
                                    poster,
                                    accessories,
                                    categories
                                }
                            }
                        }}
                    >
                        <Recipe title={title} instagramAuthor={instagramAuthor} preparationTime={preparationTime} accessories={accessories} categories={categories} poster={poster}/>
                    </Link>
                ))
            }
        </div>
    )
}

export default RecipesList;
