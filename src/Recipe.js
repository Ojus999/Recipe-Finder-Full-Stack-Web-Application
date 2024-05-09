import React from 'react';
import './Recipe.css'; // Import CSS file for styling

function Recipe({ recipe }) {
  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <center> <img className="recipe-image" src={recipe.image} alt={recipe.title} /> </center> 
      <div className="recipe-details">
        <p><span className="detail-label">Servings:</span> {recipe.servings}</p>
        <p><span className="detail-label">Ready in Minutes:</span> {recipe.readyInMinutes}</p>
        <p><span className="detail-label">Source:</span> {recipe.sourceName}</p>
        <p><span className="detail-label">Price Per Serving:</span> ${recipe.pricePerServing}</p>
      </div>
      <div className="recipe-ingredients">
        <h2>Ingredients:</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-summary">
        <h2>Summary:</h2>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      </div>
      <div className="recipe-wine-pairing">
        <h2>Wine Pairing:</h2>
        <p className="wine-pairing-text">{recipe.winePairing.pairingText}</p>
        <div className="product-matches">
          {recipe.winePairing.productMatches.map(product => (
            <div key={product.id} className="product-match">
              <h3>{product.title}</h3>
             <center> <img src={product.imageUrl} alt={product.title} className="product-image" /> </center>
              <p><span className="detail-label">Description:</span> {product.description}</p>
              <p><span className="detail-label">Price:</span> {product.price}</p>
              <p><span className="detail-label">Rating:</span> {product.averageRating} (out of {product.ratingCount} ratings)</p>
              <a href={product.link} className="buy-now-link">Buy Now</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
