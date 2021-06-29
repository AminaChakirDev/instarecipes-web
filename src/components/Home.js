import RecipesList from "./RecipesList";

function Home() {
    return (
        <div className="Home">
            <p className='home-title'>Recette à la une</p>
            <RecipesList />
        </div>
    );
}

export default Home;
