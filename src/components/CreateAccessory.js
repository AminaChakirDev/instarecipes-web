import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_ACCESSORY = gql`
  mutation CreateAccessory(
    $data: AccessoryInput!
  ) {
    createAccessory(data: $data) {
      _id
      title
      icon
    }
  }
`;

const CreateAccessory = () => {
    const [formState, setFormState] = useState({
        title: 'pic en bois',
        icon: 'pic en bois url'
    });

    const [createAccessory] = useMutation(CREATE_ACCESSORY, {
        variables: {
            data:
            formState
        }
    });

    return (
        <div>
            <h3>Créer un accessoire</h3>
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
    );
};

export default CreateAccessory;