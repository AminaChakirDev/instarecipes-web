function RecipeDetails(props) {

    const params = props.match.params;

    return (
        <div>
            <p>name: <em>{params.name}</em></p>
        </div>
    )
}

export default RecipeDetails;
