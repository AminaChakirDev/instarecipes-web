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

function CreateRecipe() {

    const [formState, setFormState] = useState({
        title: 'Brownie',
        instagramUrl: 'https://www.instagram.com/p/CL1yduWDhop/embed/captioned',
        instagramAuthor: 'karimaelmakhloufi',
        preparationTime: 10,
        updatedAt: '',
        onTop: false,
        poster: noImage,
        ingredients : [
            {
                _id: '60e41308d52bf500192cb95c',
                title: 'chocolat',
                icon:'url chocolat'
            },
            {
                _id: '60e41314d52bf500192cb95d',
                title: 'beurre',
                icon:'url beurre'
            },
        ],
        accessories: {
            _id: '60e412f2d52bf500192cb95a',
            title: 'bol',
            icon:'url bol'
        },
        categories: {
            _id: '60e4126cd52bf500192cb958',
            title: 'pâtisserie',
            icon:'url pâtisserie'
        },
    });

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
                }
        }
    });

    const { error, data } = useQuery(INGREDIENTS);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const tata = [];
        if (data && data.getIngredients) {
            data.getIngredients.map((a) => {
                tata.push({
                    key: a.title,
                    cat: a._id,
                })
            });
            setIngredients(tata)
        }
    }, [data]);

    const [ingredientsSelected, setIngredientsSelected] = useState([]);

    useEffect(() => {
        console.log(ingredientsSelected)
    }, [ingredientsSelected]);

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

    return (
        <div className="Admin">
            <h3>Créer une recette</h3>

            <div>
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
                                options={ingredients}
                                displayValue="key"
                                onSelect={(selectedList) => setIngredientsSelected([...ingredientsSelected, selectedList])}
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
                                <img className="upload-poster" src={formState.poster}/>
                        }
                        <button className="button" type="submit">AJOUTER LA RECETTE</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default CreateRecipe;