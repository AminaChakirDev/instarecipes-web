import {useLocation} from "react-router-dom";
import {Image} from "cloudinary-react";
import React from "react";

function AdminRecipe() {

    const location = useLocation();
    const {recipe} = location.state;

    return (
        <div key={recipe.title}>
            <iframe
                src={recipe.instagramUrl}
                width="400"
                height="400"
                frameBorder="0"
                scrolling="no"
                title="La page RecipeInsta de la recette"
                allowTransparency="true"
            >
            </iframe>
            <p>Lien post instagram :</p>
            <input
                value={recipe.instagramUrl}
                type="text"
                placeholder="Lien du post instagram"
            />
            <p>Titre :</p>
            <input
                value={recipe.title}
                type="text"
                placeholder="Titre de la recette"
            />
            <p>Instagrammeur.euse :</p>
            <input
                value={recipe.instagramAuthor}
                type="text"
                placeholder="Auteur du post"
            />
            <p>Temps de préparation :</p>
            <input
                value={recipe.preparationTime}
                type="text"
                placeholder="Temps de préparation"
            />
            <p>Image de présentation :</p>
            <Image cloudName="dz632zpoz" publicId={recipe.poster} width="50" crop="scale" />
        </div>
    )
}

export default AdminRecipe;


