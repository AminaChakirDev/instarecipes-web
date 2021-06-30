import { gql, useMutation } from '@apollo/client';
import React, {useState} from "react";
import noImage from './../no-image-icon.png';
import Loader from "react-js-loader";
import slugify from "slugify";

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

function CreateRecipe() {

    const [formState, setFormState] = useState({
        title: '',
        instagramUrl: '',
        instagramAuthor: '',
        preparationTime: 10,
        updatedAt: '',
        onTop: false,
        poster: noImage,
        ingredients : [
            {
                _id: '60b88dde9f29af5a1bad7621',
                title: 'fraise',
                icon:'url fraise'
            }
        ],
        accessories: {
            _id: '60b9d9f2709a2f84050f8a19',
            title: 'saladier',
            icon:'url saladier'
        },
        categories: {
            _id: '60b9e0f318b48f86f31d7a22',
            title: 'brunch',
            icon:'url brunch'
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
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <button className="button" type="submit">AJOUTER LA RECETTE</button>
                </form>
            </div>

        </div>
    );
}

export default CreateRecipe;