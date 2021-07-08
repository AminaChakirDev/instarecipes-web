import {useLocation} from "react-router-dom";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import slugify from "slugify";
import { useHistory } from "react-router-dom";

const DELETE_CATEGORY = gql`
  mutation DeleteCategory ($_id: String!) {
    deleteCategory (
       _id: $_id
    )
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $data: CategoryInput!
    $_id: String!
  ) {
    updateCategory(data: $data, _id: $_id) {
      _id
      title
    }
  }
`;

function AdminCategory() {

    const location = useLocation();
    const {category} = location.state.category;

    let history = useHistory();

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        variables: {
            _id: category._id
        }
    });

    const [formState, setFormState] = useState({
        title: category.title,
        icon: category.icon,
    });

    const [updateCategory] = useMutation(UPDATE_CATEGORY, {
        variables: {
            _id: category._id,
            data:
                {
                    ...formState,
                    slug: slugify(formState.title),
                }
        }
    });

    return (
        <div key={category.title}>
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
                placeholder="Nom de la catégorie'"
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
                placeholder="Icon de la catégorie"
            />

            <button onClick={() => updateCategory()}>Appliquer les modifications</button>
            <button onClick={() => deleteCategory()}>Supprimer l'accessoire</button>
            <button onClick={()=>history.push("/admin/categories")}>Retour aux catégories</button>
        </div>
    )
}

export default AdminCategory;


