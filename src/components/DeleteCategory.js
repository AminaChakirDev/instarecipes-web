import { gql, useMutation } from '@apollo/client';
import {useState} from "react";

const DELETE_CATEGORY = gql`
  mutation DeleteCategory ($title: String!) {
    deleteCategory (
       title: $title
    )
  }
`;

function DeleteCategory() {

    const [title, setTitle] = useState('toto');

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        variables: {
            title
        }
    });

    return (
        <div className="Admin">
            <h3>Supprimer une catégorie</h3>

            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        deleteCategory();
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
                    <button type="submit">SUPPRIMER LA CATEGORIE</button>
                </form>
            </div>

        </div>
    );
}

export default DeleteCategory;