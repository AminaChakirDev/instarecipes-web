import CreateRecipe from "./CreateRecipe";
import {gql, useQuery} from "@apollo/client";
import {Image} from "cloudinary-react";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
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

function AdminRecipes() {

    const { loading, error, data } = useQuery(RECIPES);

    return (
        <div className="admin-page">
            <h2>Gestion des recettes</h2>
            {
                data && data.getRecipes ?
                    <table>
                        <caption>Liste des recettes</caption>
                        <tr>
                            <th>Voir</th>
                            <th>poster</th>
                            <th>title</th>
                            <th>slug</th>
                            <th>Auteur</th>
                            <th>Post instagram</th>
                            <th>Temps de préparation</th>
                            <th>Ingrédients</th>
                            <th>Accessoires</th>
                            <th>Catégories</th>
                            <th>Supprimer</th>
                        </tr>
                        {
                            data.getRecipes.map(({
                                 _id,
                                 title,
                                 onTop,
                                 slug,
                                 instagramAuthor,
                                 instagramUrl,
                                 preparationTime,
                                 poster,
                                 createdAt,
                                 updatedAt,
                                 ingredients,
                                 accessories,
                                 categories
                            }) =>(
                                <tr>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: `/admin/recipes/${slug}`,
                                                state: {
                                                    recipe: {
                                                        _id,
                                                        title,
                                                        onTop,
                                                        instagramAuthor,
                                                        instagramUrl,
                                                        preparationTime,
                                                        createdAt,
                                                        updatedAt,
                                                        poster,
                                                        ingredients,
                                                        accessories,
                                                        categories
                                                    }
                                                }
                                            }}
                                        >
                                            <SearchIcon fontSize="small"/>
                                        </Link>
                                    </td>
                                    <td><Image cloudName="dz632zpoz" publicId={poster} width="50" crop="scale" /></td>
                                    <td>{title}</td>
                                    <td>{slug}</td>
                                    <td>{instagramAuthor}</td>
                                    <td>{instagramUrl}</td>
                                    <td>{preparationTime}</td>
                                    <td>
                                        <ul>{ingredients.map((ingredient)=> <li>{ingredient.title}</li>)}</ul>
                                    </td>
                                    <td>
                                        <ul>{accessories.map((accessory)=> <li>{accessory.title}</li>)}</ul>
                                    </td>
                                    <td>
                                        <ul>{categories.map((category)=> <li>{category.title}</li>)}</ul>
                                    </td>
                                    <td><HighlightOffIcon fontSize="small"/></td>
                                </tr>
                            ))
                        }
                    </table>
                : ""
            }

            <CreateRecipe/>
        </div>
    );
}

export default AdminRecipes;
