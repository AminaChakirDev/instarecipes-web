import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import slugify from "slugify";

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient ($_id: String!) {
    deleteIngredient (
       _id: $_id
    )
  }
`;

const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient(
    $data: IngredientInput!
    $_id: String!
  ) {
    updateIngredient(data: $data, _id: $_id) {
      _id
      title
    }
  }
`;

function AdminIngredient() {

    const location = useLocation();
    const {ingredient} = location.state.ingredient;

    const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
        variables: {
            _id: ingredient._id
        }
    });

    const [formState, setFormState] = useState({
        title: ingredient.title,
        icon: ingredient.icon,
    });

    const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
        variables: {
            _id: ingredient._id,
            data:
                {
                    ...formState,
                    slug: slugify(formState.title),
                }
        }
    });

    return (
        <div key={ingredient.title}>
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
                placeholder="Nom de l'ingrédient"
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
                placeholder="Icon de l'ingrédient"
            />

            <button onClick={() => updateIngredient()}>Appliquer les modifications</button>
            <button onClick={() => deleteIngredient()}>Supprimer l'ingrédient</button>
        </div>
    )
}

export default AdminIngredient;


