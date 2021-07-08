import {gql, useMutation, useQuery} from '@apollo/client';
import React, {useEffect, useState} from "react";
import noImage from './../no-image-icon.png';
import Loader from "react-js-loader";
import slugify from "slugify";
import { Multiselect } from 'multiselect-react-dropdown';

const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $data: RecipeInput!
  ) {
    createRecipe(data: $data) {
      _id
      title
    }
  }
`;

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

function CreateRecipe({showCreate, onClose}) {

    const [formState, setFormState] = useState({
        title: 'Brownie',
        instagramUrl: 'https://www.instagram.com/p/CL1yduWDhop/embed/captioned',
        instagramAuthor: 'karimaelmakhloufi',
        preparationTime: 10,
        updatedAt: '',
        onTop: false,
        poster: noImage,
    });

    const dataIngredients = useQuery(INGREDIENTS).data;
    const [ingredients, setIngredients] = useState([]);
    const [ingredientsSelected, setIngredientsSelected] = useState([]);

    const dataAccessories = useQuery(ACCESSORIES).data;
    const [accessories, setAccessories] = useState([]);
    const [accessoriesSelected, setAccessoriesSelected] = useState([]);

    const dataCategories = useQuery(CATEGORIES).data;
    const [categories, setCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    const [createRecipe] = useMutation(CREATE_RECIPE, {
        variables: {
            data:
                {
                    ...formState,
                    createdAt: new Intl.DateTimeFormat(
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
                    ingredients: ingredientsSelected.map((ingredientSelected) => {
                        return {...ingredientSelected, key: undefined}
                    } ),
                    accessories: accessoriesSelected.map((accessorySelected) => {
                        return {...accessorySelected, key: undefined}
                    } ),
                    categories: categoriesSelected.map((categorySelected) => {
                        return {...categorySelected, key: undefined}
                    } ),
                }
        }
    });

    useEffect(() => {
        const ingredientsArray = [];
        if (dataIngredients && dataIngredients.getIngredients) {
            dataIngredients.getIngredients.map((a) => {
                return ingredientsArray.push({
                    key: a.title,
                    _id: a._id,
                    title: a.title,
                    icon: a.icon,
                })
            });
            setIngredients(ingredientsArray)
        }
    }, [dataIngredients]);

    useEffect(() => {
        const accessoriesArray = [];
        if (dataAccessories && dataAccessories.getAccessories) {
            return dataAccessories.getAccessories.map((a) => {
                accessoriesArray.push({
                    key: a.title,
                    _id: a._id,
                    title: a.title,
                    icon: a.icon,
                })
            });
            setAccessories(accessoriesArray)
        }
    }, [dataAccessories]);

    useEffect(() => {
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
            setCategories(categoriesArray)
        }
    }, [dataCategories]);

    const [loading, setLoading ] = useState(false);

    const uploadImage = (e) => {
        setLoading(true);
        const data = new FormData()
        data.append("file", e.target.files[0])
        data.append("upload_preset", "aaitmc")
        data.append("cloud_name","dz632zpoz")
        fetch("https://api.cloudinary.com/v1_1/dz632zpoz/image/upload",{
            method:"post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setFormState({
                    ...formState,
                    poster: data.url,
                })
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    if (!showCreate) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Créer une recette</h3>
                </div>
                <div className="modal-body">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createRecipe();
                        }}
                    >
                        <div className="form-input-container">
                            <input
                                value={formState.title}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        title: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="Title"
                            />
                            <input
                                value={formState.instagramUrl}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        instagramUrl: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="Instagram Url"
                            />
                            <input
                                value={formState.instagramAuthor}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        instagramAuthor: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="Instagram author"
                            />
                            <input
                                value={formState.preparationTime}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        preparationTime: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="Preparation time"
                            />
                            <input
                                value={formState.onTop}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        onTop: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="On Top"
                            />
                            <Multiselect
                                placeholder="Ingredients"
                                emptyRecordMsg="Plus de résultat"
                                options={ingredients}
                                displayValue="key"
                                onSelect={(selectedList) => {
                                    setIngredientsSelected([...selectedList])
                                }}
                                onRemove={(selectedList => {
                                    setIngredientsSelected([...selectedList])
                                })}
                            />
                            <Multiselect
                                placeholder="Accessoires"
                                emptyRecordMsg="Plus de résultat"
                                options={accessories}
                                displayValue="key"
                                onSelect={(selectedList) => {
                                    setAccessoriesSelected([...selectedList])
                                }}
                                onRemove={(selectedList => {
                                    setAccessoriesSelected([...selectedList])
                                })}
                            />
                            <Multiselect
                                placeholder="Categories"
                                emptyRecordMsg="Plus de résultat"
                                options={categories}
                                displayValue="key"
                                onSelect={(selectedList) => {
                                    setCategoriesSelected([...selectedList])
                                }}
                                onRemove={(selectedList => {
                                    setCategoriesSelected([...selectedList])
                                })}
                            />
                        </div>
                        <div className="input-file-container">
                            <label htmlFor="file" className="label-file">Choisir une image</label>
                            <input
                                id="file"
                                className="input-file"
                                type="file"
                                onChange= {(e)=> {
                                    uploadImage(e)
                                }}
                            />
                            {
                                loading ?
                                    <Loader type="rectangular-ping" bgColor={"#FF3453"} title={"rectangular-ping"} size={100} />
                                :
                                    <img className="upload-poster" src={formState.poster} alt="Photo de la recette"/>
                            }
                            <button className="button" type="submit">AJOUTER LA RECETTE</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="button">Fermer</button>
                </div>
            </div>
        </div>
    );
}

export default CreateRecipe;