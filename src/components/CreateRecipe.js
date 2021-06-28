import { gql, useMutation } from '@apollo/client';

const ADD_RECIPE = gql`
  mutation AddRecipe(
    $data: RecipeInput!
  ) {
    createRecipe(
        data: $data
    ) {
      _id
    }
  }
`;

function AddRecipe() {
    return (
        <div className="Admin">
            <p className='admin-title'>Création de recettes</p>
        </div>
    );
}

export default AddRecipe;