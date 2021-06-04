import RecipesList from "./RecipesList";

function Home() {
    return (
        <div className="Home">
            <p className='home-title'>Recettes à la Une</p>
            <RecipesList/>
        </div>
    );
}

export default Home;
