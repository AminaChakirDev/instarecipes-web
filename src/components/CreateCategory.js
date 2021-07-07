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

const CreateCategory = () => {
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

    return (
        <div>
            <h3>Créer une catégorie</h3>
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
    );
};

export default CreateCategory;