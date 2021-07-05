import { gql, useMutation } from '@apollo/client';
import {useState} from "react";

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient ($title: String!) {
    deleteIngredient (
       title: $title
    )
  }
`;

function DeleteIngredient() {

    const [title, setTitle] = useState('toto');

    const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
        variables: {
            title
        }
    });

    return (
        <div className="Admin">
            <h3>Supprimer un ingrédient</h3>

            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        deleteIngredient();
                    }}
                >
                    <div>
                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            type="text"
                            placeholder="Title"
                        />
                    </div>
                    <button type="submit">SUPPRIMER L'INGREDIENT</button>
                </form>
            </div>

        </div>
    );
}

export default DeleteIngredient;