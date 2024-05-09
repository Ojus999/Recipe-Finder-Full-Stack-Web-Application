import { useState } from "react";
// import { Link } from 'react-router-dom';
import "../App.css";
// import Recipe from "../Recipe";

export default function Card({ id, title, image, flag, change}) {

    const [recipe, setRecipe] = useState('');

    async function sendPOSTmethod({ id, title, image }) {
        try {
            const response = await fetch("http://localhost:3001/save", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ id, title, image }),
            });
            const data = await response.json();
            window.alert(data.message);
        } catch (err) {
            console.log(err);
        }
    }

    async function getRecipe(id) {
        try {
            const apiKey = "ae0636d4501d4470af462802baf0528f";
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            , {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            const data = await response.json();
            setRecipe(data);
            change(data);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="card">
            <p><b>Recipe ID : </b>{id}</p>
            <p><b>Recipe Name:</b></p>
            <p>{title}</p>
            <img src={image} alt="Not Found" />
            {
                flag ? (<button onClick={() => sendPOSTmethod({ id, title, image })}>Save</button>) :
                (
    
              <button onClick={() => {getRecipe(id) 
                console.log(recipe)}}>Display Recipe</button>
            
                            )
            }
        </div>
    );
}
