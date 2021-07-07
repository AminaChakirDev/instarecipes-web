import {Link, useLocation} from "react-router-dom";
import {Image} from "cloudinary-react";
import React, {useEffect, useState} from "react";
import {Multiselect} from "multiselect-react-dropdown";
import {gql, useQuery} from "@apollo/client";

const INGREDIENTS = gql`
query getIngredients {
  getIngredients {
    _id
    title
    icon
  }
}
`;

const ACCESSORIES = gql`
query getAccessories {
  getAccessories {
    _id
    title
    icon
  }
}
`;

const CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    title
    icon
  }
}
`;

function AdminRecipe() {

    const location = useLocation();
    const {recipe} = location.state;

    const dataIngredients = useQuery(INGREDIENTS).data;
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingredientsSelected, setIngredientsSelected] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const dataAccessories = useQuery(ACCESSORIES).data;
    const [accessoriesList, setAccessoriesList] = useState([]);
    const [accessoriesSelected, setAccessoriesSelected] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const dataCategories = useQuery(CATEGORIES).data;
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const ingredients = recipe.ingredients.map((ingredient) => { return {...ingredient, key:ingredient.title}})
        setIngredients(ingredients);

        const accessories = recipe.accessories.map((accessory) => { return {...accessory, key:accessory.title}})
        setAccessories(accessories);

        const categories = recipe.categories.map((category) => { return {...category, key:category.title}})
        setCategories(categories);

        const ingredientsArray = [];
        if (dataIngredients && dataIngredients.getIngredients) {
            dataIngredients.getIngredients.map((a) => {
                ingredientsArray.push({
                    key: a.title,
                    _id: a._id,
                    title: a.title,
                    icon: a.icon,
                })
            });
            setIngredientsList(ingredientsArray)
        }

        const accessoriesArray = [];
        if (dataAccessories && dataAccessories.getAccessories) {
            dataAccessories.getAccessories.map((a) => {
                accessoriesArray.push({
                    key: a.title,
                    _id: a._id,
                    title: a.title,
                    icon: a.icon,
                })
            });
            setAccessoriesList(accessoriesArray)
        }

        const categoriesArray = [];
        if (dataCategories && dataCategories.getCategories) {
            dataCategories.getCategories.map((a) => {
                categoriesArray.push({
                    key: a.title,
                    _id: a._id,
                    title: a.title,
                    icon: a.icon,
                })
            });
            setCategoriesList(categoriesArray)
        }
    }, []);

    return (
        <div key={recipe.title}>
            <iframe
                src={recipe.instagramUrl}
                width="400"
                height="400"
                frameBorder="0"
                scrolling="no"
                title="La page RecipeInsta de la recette"
                allowTransparency="true"
            >
            </iframe>
            <p>Lien post instagram :</p>
            <input
                value={recipe.instagramUrl}
                type="text"
                placeholder="Lien du post instagram"
            />
            <p>Titre :</p>
            <input
                value={recipe.title}
                type="text"
                placeholder="Titre de la recette"
            />
            <p>Instagrammeur.euse :</p>
            <input
                value={recipe.instagramAuthor}
                type="text"
                placeholder="Auteur du post"
            />
            <p>Temps de préparation :</p>
            <input
                value={recipe.preparationTime}
                type="text"
                placeholder="Temps de préparation"
            />
            <p>Image de présentation :</p>
            <Image cloudName="dz632zpoz" publicId={recipe.poster} width="50" crop="scale" />
            <table>
                <caption>Ingrédients</caption>
                <tr>
                    <th>Nom</th>
                    <th>Icon</th>
                </tr>
                {
                    recipe.ingredients.map(({ title, icon }) =>(
                        <tr>
                            <td>{title}</td>
                            <td>{icon}</td>
                        </tr>
                    ))
                }
            </table>
            <p>Ingrédients</p>
            <Multiselect
                placeholder="Ingrédients"
                emptyRecordMsg="Plus de résultat"
                options={ingredientsList}
                selectedValues={ingredients}
                displayValue="key"
                onSelect={(selectedList) => {
                    setIngredientsSelected([...selectedList])
                }}
                onRemove={(selectedList => {
                    setIngredientsSelected([...selectedList])
                })}
            />
            <table>
                <caption>Accessoires</caption>
                <tr>
                    <th>Nom</th>
                    <th>Icon</th>
                </tr>
                {
                    recipe.accessories.map(({ title, icon }) =>(
                        <tr>
                            <td>{title}</td>
                            <td>{icon}</td>
                        </tr>
                    ))
                }
            </table>
            <p>Catégories</p>
            <Multiselect
                placeholder="Accessoires"
                emptyRecordMsg="Plus de résultat"
                options={accessoriesList}
                selectedValues={accessories}
                displayValue="key"
                onSelect={(selectedList) => {
                    setAccessoriesSelected([...selectedList])
                }}
                onRemove={(selectedList => {
                    setAccessoriesSelected([...selectedList])
                })}
            />
            <table>
                <caption>Catégories</caption>
                <tr>
                    <th>Nom</th>
                    <th>Icon</th>
                </tr>
                {
                    recipe.categories.map(({ title, icon }) =>(
                        <tr>
                            <td>{title}</td>
                            <td>{icon}</td>
                        </tr>
                    ))
                }
            </table>
            <p>Catégories</p>
            <Multiselect
                placeholder="Catégories"
                emptyRecordMsg="Plus de résultat"
                options={categoriesList}
                selectedValues={categories}
                displayValue="key"
                onSelect={(selectedList) => {
                    setCategoriesSelected([...selectedList])
                }}
                onRemove={(selectedList => {
                    setCategoriesSelected([...selectedList])
                })}
            />
            <button>Appliquer les modifications</button>
            <button>Supprimer la recette</button>
        </div>
    )
}

export default AdminRecipe;


