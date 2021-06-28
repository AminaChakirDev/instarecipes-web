import { gql, useMutation } from '@apollo/client';
import {useState} from "react";

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
        title: 'toto',
        instagramUrl: 'toto',
        instagramAuthor: 'toot',
        preparationTime: 10,
        createdAt: '28/06/2021',
        updatedAt: '20/07/2021',
        onTop: false,
        poster: 'TYTY',
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
            formState
        }
    });

    return (
        <div className="Admin">
            <p className='admin-title'>Création de recettes</p>

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
                            value={formState.createdAt}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    createdAt: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Created At"
                        />
                    </div>
                    <div>
                        <input
                            value={formState.updatedAt}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    updatedAt: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Updated at"
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
                    <div>
                        <input
                            value={formState.poster}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    poster: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Poster"
                        />
                    </div>
                    <button type="submit">AJOUTER LA RECETTE</button>
                </form>
            </div>

        </div>
    );
}

export default CreateRecipe;