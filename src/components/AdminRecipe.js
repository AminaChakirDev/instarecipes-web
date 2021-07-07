import {Link, useLocation} from "react-router-dom";
import {Image} from "cloudinary-react";
import React, {useEffect, useState} from "react";
import {Multiselect} from "multiselect-react-dropdown";
import {gql, useMutation, useQuery} from "@apollo/client";
import noImage from "../no-image-icon.png";
import slugify from "slugify";

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

const DELETE_RECIPE = gql`
  mutation DeleteRecipe ($_id: String!) {
    deleteRecipe (
       _id: $_id
    )
  }
`;

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $data: RecipeInput!
    $_id: String!
  ) {
    updateRecipe(data: $data, _id: $_id) {
      _id
      title
    }
  }
`;

function AdminRecipe() {

    const location = useLocation();
    const {recipe} = location.state;

    const dataIngredients = useQuery(INGREDIENTS).data;
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingredientsSelectedUpdated, setIngredientsSelectedUpdated] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const dataAccessories = useQuery(ACCESSORIES).data;
    const [accessoriesList, setAccessoriesList] = useState([]);
    const [accessoriesSelectedUpdated, setAccessoriesSelectedUpdated] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const dataCategories = useQuery(CATEGORIES).data;
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesSelectedUpdated, setCategoriesSelectedUpdated] = useState([]);
    const [categories, setCategories] = useState([]);

    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        variables: {
            _id: recipe._id
        }
    });

    const [formState, setFormState] = useState({
        title: recipe.title,
        instagramUrl: recipe.instagramUrl,
        instagramAuthor: recipe.instagramAuthor,
        preparationTime: recipe.preparationTime,
        onTop: false,
        poster: recipe.poster,
    });

    const [updateRecipe] = useMutation(UPDATE_RECIPE, {
        variables: {
            _id: recipe._id,
            data:
                {
                    ...formState,
                    createdAt: recipe.createdAt,
                    updatedAt: new Intl.DateTimeFormat(
                        'fr-FR',
                        {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })
                        .format(Date.now()),
                    slug: slugify(formState.title),
                    ingredients: ingredientsSelectedUpdated.map((ingredientSelectedUpdated) => {
                        return {... ingredientSelectedUpdated, key: undefined, __typename: undefined}
                    } ),
                    accessories: accessoriesSelectedUpdated.map((accessorySelectedUpdated) => {
                        return {... accessorySelectedUpdated, key: undefined, __typename: undefined}
                    } ),
                    categories: categoriesSelectedUpdated.map((categorySelectedUpdated) => {
                        return {... categorySelectedUpdated, key: undefined, __typename: undefined}
                    } ),
                }
        }
    });

    useEffect(() => {
        const ingredients = recipe.ingredients.map((ingredient) => { return {...ingredient, key:ingredient.title}})
        setIngredients(ingredients);
        setIngredientsSelectedUpdated(ingredients);

        const accessories = recipe.accessories.map((accessory) => { return {...accessory, key:accessory.title}})
        setAccessories(accessories);
        setAccessoriesSelectedUpdated(accessories);

        const categories = recipe.categories.map((category) => { return {...category, key:category.title}})
        setCategories(categories);
        setCategoriesSelectedUpdated(categories);

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
    }, [dataAccessories, dataIngredients, dataCategories]);

    return (
        <div key={recipe.title}>
            <iframe
                src={formState.instagramUrl}
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
                value={formState.instagramUrl}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        instagramUrl: e.target.value
                    })
                }
                type="text"
                placeholder="Lien du post instagram"
            />
            <p>Titre :</p>
            <input
                value={formState.title}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        title: e.target.value
                    })
                }
                type="text"
                placeholder="Titre de la recette"
            />
            <p>Instagrammeur.euse :</p>
            <input
                value={formState.instagramAuthor}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        instagramAuthor: e.target.value
                    })
                }
                type="text"
                placeholder="Auteur du post"
            />
            <p>Temps de préparation :</p>
            <input
                value={formState.preparationTime}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        preparationTime: e.target.value
                    })
                }
                type="text"
                placeholder="Temps de préparation"
            />
            <p>Image de présentation :</p>
            <Image cloudName="dz632zpoz" publicId={recipe.poster} width="50" crop="scale" />
            <Multiselect
                placeholder="Ingrédients"
                emptyRecordMsg="Plus de résultat"
                options={ingredientsList}
                selectedValues={ingredients}
                displayValue="key"
                onSelect={(selectedList) => {
                    setIngredientsSelectedUpdated([...selectedList])
                }}
                onRemove={(selectedList => {
                    setIngredientsSelectedUpdated([...selectedList])
                })}
            />
            <Multiselect
                placeholder="Accessoires"
                emptyRecordMsg="Plus de résultat"
                options={accessoriesList}
                selectedValues={accessories}
                displayValue="key"
                onSelect={(selectedList) => {
                    setAccessoriesSelectedUpdated([...selectedList])
                }}
                onRemove={(selectedList => {
                    setAccessoriesSelectedUpdated([...selectedList])
                })}
            />
            <Multiselect
                placeholder="Catégories"
                emptyRecordMsg="Plus de résultat"
                options={categoriesList}
                selectedValues={categories}
                displayValue="key"
                onSelect={(selectedList) => {
                    setCategoriesSelectedUpdated([...selectedList])
                }}
                onRemove={(selectedList => {
                    setCategoriesSelectedUpdated([...selectedList])
                })}
            />
            <button onClick={() => updateRecipe()}>Appliquer les modifications</button>
            <button onClick={() => deleteRecipe()}>Supprimer la recette</button>
        </div>
    )
}

export default AdminRecipe;


