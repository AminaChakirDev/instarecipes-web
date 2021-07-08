import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import slugify from "slugify";

const DELETE_ACCESSORY = gql`
  mutation DeleteAccessory ($_id: String!) {
    deleteAccessory (
       _id: $_id
    )
  }
`;

const UPDATE_ACCESSORY = gql`
  mutation UpdateAccessory(
    $data: AccessoryInput!
    $_id: String!
  ) {
    updateAccessory(data: $data, _id: $_id) {
      _id
      title
    }
  }
`;

function AdminAccessory() {

    const location = useLocation();
    const {accessory} = location.state.accessory;

    const [deleteAccessory] = useMutation(DELETE_ACCESSORY, {
        variables: {
            _id: accessory._id
        }
    });

    const [formState, setFormState] = useState({
        title: accessory.title,
        icon: accessory.icon,
    });

    const [updateAccessory] = useMutation(UPDATE_ACCESSORY, {
        variables: {
            _id: accessory._id,
            data:
                {
                    ...formState,
                    slug: slugify(formState.title),
                }
        }
    });

    return (
        <div key={accessory.title}>
            <p>Titre :</p>
            <input
                value={formState.title}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        title: e.target.value
                    })
                }
                type="text"
                placeholder="Nom de l'accessoire'"
            />

            <p>Icon :</p>
            <input
                value={formState.icon}
                onChange={(e) =>
                    setFormState({
                        ...formState,
                        icon: e.target.value
                    })
                }
                type="text"
                placeholder="Icon de l'accessoire"
            />

            <button onClick={() => updateAccessory()}>Appliquer les modifications</button>
            <button onClick={() => deleteAccessory()}>Supprimer l'accessoire</button>
        </div>
    )
}

export default AdminAccessory;


