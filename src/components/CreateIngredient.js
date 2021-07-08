import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import slugify from "slugify";

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient(
    $data: IngredientInput!
  ) {
    createIngredient(data: $data) {
      _id
      title
      icon
      slug
    }
  }
`;

const CreateIngredient = ({showCreate, onClose}) => {
    const [formState, setFormState] = useState({
        title: '',
        icon: ''
    });

    const [createIngredient] = useMutation(CREATE_INGREDIENT, {
        variables: {
            data: {
                ...formState,
                slug: slugify(formState.title),
            }
        }
    });

    if (!showCreate) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Créer un ingrédient</h3>
                </div>
                <div className="modal-body">
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
                <div className="modal-footer">
                    <button onClick={onClose} className="button">Fermer</button>
                </div>
            </div>
        </div>
    );
};

export default CreateIngredient;