function Ingredient({title, icon}) {

    return (
        <div className="recipe-main-container" key={title}>
            <div className="recipe-details-container">
                <div className="recipe-detail-container recipe-title">{title}</div>
                <div className="recipe-detail-container recipe-title">{icon}</div>
            </div>
        </div>
    )
}

export default Ingredient;
