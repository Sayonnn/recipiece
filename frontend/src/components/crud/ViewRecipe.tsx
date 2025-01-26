// src/components/RecipeDetail.tsx
import React from "react";

import { useGraphQL } from "../../contexts/graphql";

const ViewRecipe: React.FC = () => {
 const {recipe} = useGraphQL()

  return (
    <div>
      <h1>{recipe?.recipe.recipeName}</h1>
      <p>{recipe?.recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe?.recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRecipe;
