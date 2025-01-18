// src/components/UpdateRecipe.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_RECIPE } from "../graphql/recipeQueries";
import { useParams } from "react-router-dom";
import { Ingredient, TypeRecipe } from "../providers/TypeProvider";
import Title from "./custom/Title";
import Button from "./custom/Button";
import { icons } from "../utils/icons";

type typeUpdateRecipe = {
  recipe: TypeRecipe;
};

const UpdateRecipe: React.FC<typeUpdateRecipe> = ({ recipe }) => {
  const [updateRecipe, { loading, error }] = useMutation(UPDATE_RECIPE);
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState(recipe.recipeName || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe.ingredients || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRecipe({
      variables: { id, name, description, ingredients },
    });
  };

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setIngredients((prev) =>
      prev.map((ingredient, i) => {
        return i === index ? { ...ingredient, [name]: value } : ingredient;
      })
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => {
      return prev.filter((ingredient, i) => {
        const newIngredient = i !== index && ingredient;
        return newIngredient;
      });
    });
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  if (loading) return <p>Updating...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="md:col-span-4 border flex flex-col p-4 gap-2"
    >
      <Title>Update Recipe</Title>

      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Title>
        Ingredients
        <Button type="button" onClick={addIngredient}>
          <span className="rounded-lg">{icons.iFaPlus}</span>
        </Button>
      </Title>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="text-sm grid grid-cols-3 gap-2  ">
          <input
            type="text"
            placeholder="Ingredient Name"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, e)}
            required
          />
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
            required
          />
          <Button type="button" onClick={() => removeIngredient(index)}>
            {icons.iFaTrash}
          </Button>
        </div>
      ))}

      <div className="flex items-center justify-center gap-4">
        <Button type="submit">Confirm Update</Button>
      </div>
    </form>
  );
};

export default UpdateRecipe;
