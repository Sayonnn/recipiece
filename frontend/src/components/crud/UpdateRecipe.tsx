/* eslint-disable no-unsafe-optional-chaining */
// src/components/UpdateRecipe.tsx
import { useState } from "react";
import { Ingredient } from "../../providers/TypeProvider";
import Title from "../custom/Title";
import logo from "../../assets/images/4.png";

import Button from "../custom/Button";
import { icons } from "../../utils/icons";
import { useGraphQL } from "../../contexts/graphql";

const UpdateRecipe: React.FC = () => {
  const { recipe, editRecipe ,closeEditor} = useGraphQL();
  const [id] = useState<string>(recipe?.recipe.id  || "")
  const [name, setName] = useState<string>(recipe?.recipe.recipeName || "");
  const [description, setDescription] = useState<string>(
    recipe?.recipe.description || ""
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.recipe.ingredients || []
  );

  const updateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!id) return;
    
    // Directly use the ingredients state, no need to map them
    editRecipe(id, name, description, ingredients); 
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

  return (
    <form
      onSubmit={updateRecipe}
      className="border flex flex-col p-4 gap-2 md:w-[25%] w-full bg-orange-50 rounded-lg shadow-lg"
    >
       <div className="flex justify-center w-full">
        <img src={logo} className="object-contain w-20 h-20 "></img>
      </div>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Procedure"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="max-h-[150px]"
        required
      />
      <Title>
        Ingredients
        <Button type="button" onClick={addIngredient}>
          <span className="rounded-lg">{icons.iFaPlus}</span>
        </Button>
      </Title>
      <section className="flex flex-col gap-2 max-h-[150px] overflow-y-auto  scrollbar-thin scrollbar-thumb-orange-100 scrollbar-track-gray-400">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="text-sm grid grid-cols-3 gap-2  ">
            <input
              type="text"
              placeholder="Ingredient "
              value={ingredient.name}
              name="name"
              onChange={(e) => handleIngredientChange(index,e)}
              autoComplete="off"

              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              name="quantity"
              onChange={(e) => handleIngredientChange(index,e)}
              autoComplete="off"
              required
            />
            <Button type="button" onClick={() => removeIngredient(index)}>
              {icons.iFaTrash}
            </Button>
          </div>
        ))}
      </section>

      <div className="flex items-center justify-center gap-2 ">
        <Button type="button" style="w-full" onClick={closeEditor}>
          Cancel
        </Button>
        <Button type="submit" style="w-full bg-orange-200">
          Update
        </Button>
      </div>
    </form>
  );
};

export default UpdateRecipe;
