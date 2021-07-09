import CreateRecipe from "./CreateRecipe";
import {gql, useQuery} from "@apollo/client";
import {Image} from "cloudinary-react";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import AddIcon from '@material-ui/icons/Add';

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

function AdminRecipes() {

    const { loading, error, data } = useQuery(RECIPES);

    const [showCreate, setShowCreate] = useState(false);

    const [searchedValue, setSearchedValue] = useState([]);

    let history = useHistory();

    const handleClick = (recipe) => {
        history.push({
            pathname: `/admin/recipes/${recipe.slug}`,
            state: {
                recipe: {recipe}
            }
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="admin-page">
            <h2>Gestion des recettes</h2>
            <input
                type="text"
                onChange={(e)=>setSearchedValue(e.target.value)}
                placeholder="Rechercher"
            />
            {
                data && data.getRecipes ?
                    <>
                        <button className="admin-page-add-button" onClick={() => setShowCreate(true)}><AddIcon/></button>
                        <table>
                            <thead>
                            <tr>
                                <th>Affiche</th>
                                <th>Titre</th>
                                <th>Instagrammeur.euse</th>
                                <th>Ajoutée le</th>
                                <th>Modifiée le</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.getRecipes
                                    .filter((recipe)=> searchedValue && searchedValue.length > 0 ? recipe.title.toLowerCase().includes(searchedValue.toLowerCase()) : recipe.title.includes(searchedValue))
                                    .map((recipe) =>(
                                    <tr key={recipe._id} onClick={() => handleClick(recipe)}>
                                        <td><Image cloudName="dz632zpoz" publicId={recipe.poster} width="50" crop="scale" /></td>
                                        <td>{recipe.title}</td>
                                        <td>{recipe.instagramAuthor}</td>
                                        <td>{recipe.createdAt}</td>
                                        <td>{recipe.updatedAt}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </>
                : ""
            }
            <CreateRecipe showCreate={showCreate} onClose={() => setShowCreate(false)}/>
        </div>
    );
}

export default AdminRecipes;
