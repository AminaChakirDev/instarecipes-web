import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient(
    $data: IngredientInput!
  ) {
    createIngredient(data: $data) {
      _id
      title
      icon
    }
  }
`;

const CreateIngredient = () => {
    const [formState, setFormState] = useState({
        title: 'chocolat',
        icon: 'chocolat url'
    });

    const [createIngredient] = useMutation(CREATE_INGREDIENT, {
        variables: {
            data:
                formState
        }
    });

    return (
        <div>
            <h3>Créer un ingrédient</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createIngredient();
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
                        placeholder="Title ingredient"
                    />
                    <input
                        value={formState.icon}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                icon: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Icon ingredient"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateIngredient;