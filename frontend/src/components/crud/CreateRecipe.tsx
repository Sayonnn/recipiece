// src/components/CreateRecipe.tsx
import React, { useEffect, useState } from "react";
import { Ingredient } from "../../providers/TypeProvider";
import Title from "../custom/Title";
import Button from "../custom/Button";
import logo from "../../assets/images/4.png";
import { icons } from "../../utils/icons";
import { useGraphQL } from "../../contexts/graphql";

const CreateRecipe: React.FC = () => {
  const { addRecipe, toggleModal } = useGraphQL();
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");

  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "" },
  ]);

  useEffect(() => {
    setCreator(localStorage.getItem("user") || "Chef");
  }, []);

  const saveRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    addRecipe(name, creator, description, ingredients);
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

  return (
    <form
      onSubmit={saveRecipe}
      className="border flex flex-col p-4 gap-2 md:w-[25%] w-[80%] bg-orange-50 rounded-lg shadow-lg"
    >
      <div className="flex justify-center w-full">
        <img src={logo} className="object-contain w-20 h-20 "></img>
      </div>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-sm"
        required
      />
      <textarea
        placeholder="Procedure"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="max-h-[150px] min-h-[150px] resize-none text-sm"
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
              onChange={(e) => handleIngredientChange(e, index)}
              required
              className="text-xs"
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              name="quantity"
              onChange={(e) => handleIngredientChange(e, index)}
              required
              className="text-xs"
              autoComplete="off"
            />
            <Button type="button" onClick={() => removeIngredient(index)}>
              {icons.iFaTrash}
            </Button>
          </div>
        ))}
      </section>

      <div className="flex items-center justify-center gap-2 ">
        <Button type="button" style="w-full" onClick={(e) => toggleModal(e)}>
          Cancel
        </Button>
        <Button type="submit" style="w-full bg-orange-200">
          Create Recipe
        </Button>
      </div>
    </form>
  );
};

export default CreateRecipe;
