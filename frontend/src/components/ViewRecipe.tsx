// src/components/RecipeDetail.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../graphql/recipeQueries";
import { useParams } from "react-router-dom";
import { TypeRecipe } from "../providers/TypeProvider";

const ViewRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ getRecipe: TypeRecipe }>(
    GET_RECIPE,
    {
      variables: { id },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data?.getRecipe.recipeName}</h1>
      <p>{data?.getRecipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {data?.getRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRecipe;
