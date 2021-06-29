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
        title: '',
        instagramUrl: '',
        instagramAuthor: '',
        preparationTime: 10,
        updatedAt: '',
        onTop: false,
        poster: '',
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
                }
        }
    });

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