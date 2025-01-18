// src/components/CreateRecipe.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE } from "../graphql/recipeQueries";
import { Ingredient } from "../providers/TypeProvider";
import Title from "./custom/Title";
import Button from "./custom/Button";
import { icons } from "../utils/icons";

const CreateRecipe: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);

  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
    alert(newName);
    const res = await createRecipe({
      variables: { name: newName, description, ingredients },
    });
    if (res) {
      resetForm();
    }
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setIngredients((prev) =>
      prev.map((ingredient, i) => {
        return i === index ? { ...ingredient, [name]: value } : ingredient;
      })
    );
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => {
      return prev.filter((ingredient, i) => {
        const newIngredient = i !== index && ingredient;
        return newIngredient;
      });
    });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setIngredients([]);
  };

  if (loading) return <p>Creating...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="md:col-span-4 border flex flex-col p-4 gap-2"
    >
      <Title>Create Recipe</Title>
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
      <section className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="text-sm grid grid-cols-3 gap-2  ">
            <input
              type="text"
              placeholder="Ingredient "
              value={ingredient.name}
              name="name"
              onChange={(e) => handleIngredientChange(e, index)}
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              name="quantity"
              onChange={(e) => handleIngredientChange(e, index)}
              required
            />
            <Button type="button" onClick={() => removeIngredient(index)}>
              {icons.iFaTrash}
            </Button>
          </div>
        ))}
      </section>

      <div className="flex items-center justify-center gap-4">
        <Button type="submit">Create Recipe</Button>
      </div>
    </form>
  );
};

export default CreateRecipe;
