function Recipe() {
    return (
        <div className="recipe-main-container">
            <div className="recipe-poster-container">
                <img src='./photo_test.png' className="recipe-poster" alt="poster" />
            </div>
            <div className="recipe-details-container">
                <p>Title</p>
                <p>InstagramAuthor</p>
                <p>Category</p>
                <p>Durée</p>
            </div>
        </div>
    );
}

export default Recipe;
