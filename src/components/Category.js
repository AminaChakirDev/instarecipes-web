function Category({title, icon}) {

    return (
        <div className="recipe-main-container" key={title}>
            <div className="recipe-details-container">
                <div className="recipe-detail-container recipe-title">{title}</div>
            </div>
        </div>
    )
}

export default Category;
