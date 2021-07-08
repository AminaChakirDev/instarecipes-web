import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import slugify from "slugify";

const CREATE_ACCESSORY = gql`
  mutation CreateAccessory(
    $data: AccessoryInput!
  ) {
    createAccessory(data: $data) {
      _id
      title
      icon
      slug
    }
  }
`;

const CreateAccessory = ({showCreate, onClose}) => {



    const [formState, setFormState] = useState({
        title: '',
        icon: ''
    });

    const [createAccessory] = useMutation(CREATE_ACCESSORY, {
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
                    <h3 className="modal-title">Créer un accessoire</h3>
                </div>
                <div className="modal-body">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createAccessory();
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
                                placeholder="Title accessory"
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
                                placeholder="Icon accessory"
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

export default CreateAccessory;