import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import slugify from "slugify";

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $data: CategoryInput!
  ) {
    createCategory(data: $data) {
      _id
      title
      icon
      slug
    }
  }
`;

const CreateCategory = ({showCreate, onClose}) => {
    const [formState, setFormState] = useState({
        title: '',
        icon: ''
    });

    const [createCategory] = useMutation(CREATE_CATEGORY, {
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
                    <h3 className="modal-title">Créer une catégorie</h3>
                </div>
                <div className="modal-body">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createCategory();
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
                                placeholder="Title category"
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
                                placeholder="Icon category"
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

export default CreateCategory;