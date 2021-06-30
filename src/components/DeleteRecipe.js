import { gql, useMutation } from '@apollo/client';
import {useState} from "react";

const DELETE_RECIPE = gql`
  mutation DeleteRecipe ($title: String!) {
    deleteRecipe (
       title: $title
    )
  }
`;

function DeleteRecipe() {

    const [title, setTitle] = useState('');

    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        variables: {
            title
        }
    });

    return (
        <div className="Admin">
            <h3>Supprimer une recette</h3>

            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        deleteRecipe();
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
                    <button type="submit">SUPPRIMER LA RECETTE</button>
                </form>
            </div>

        </div>
    );
}

export default DeleteRecipe;