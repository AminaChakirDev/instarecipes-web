import { gql, useMutation } from '@apollo/client';
import {useState} from "react";

const DELETE_ACCESSORY = gql`
  mutation DeleteAccessory ($title: String!) {
    deleteAccessory (
       title: $title
    )
  }
`;

function DeleteAccessory() {

    const [title, setTitle] = useState('toto');

    const [deleteAccessory] = useMutation(DELETE_ACCESSORY, {
        variables: {
            title
        }
    });

    return (
        <div className="Admin">
            <h3>Supprimer un accessoire</h3>

            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        deleteAccessory();
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
                    <button type="submit">SUPPRIMER L'ACCESSOIRE</button>
                </form>
            </div>

        </div>
    );
}

export default DeleteAccessory;