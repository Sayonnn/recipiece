// src/components/CreateRecipe.tsx
import React, { useEffect, useState } from "react";
import { Ingredient } from "../../providers/TypeProvider";
import Title from "../custom/Title";
import Button from "../custom/Button";
import logo from "../../assets/images/4.png";
import { icons } from "../../utils/icons";
import { useGraphQL } from "../../contexts/graphql";
import { bgs2 } from "../../providers/DataProvider";

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
    if(ingredients.length === 1) return;
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
      className="flex md:flex-row flex-col md:w-[60%] w-[80%] gap-10 fadeIn "
    >
      <section className="border-t-8 border-b-8 border-orange-200 flex flex-col p-4  gap-2  bg-orange-50/90  rounded-lg shadow-lg">
        <div className="flex justify-center w-full">
          <img src={logo} className="object-contain w-20 h-20 "></img>
        </div>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-xs"
          required
        />
        <textarea
          placeholder="Procedure"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="max-h-[100px] min-h-[100px] resize-none text-xs"
          required
        />
        <Title>
          Ingredients
          <Button type="button" onClick={addIngredient}>
            <span className="rounded-lg">{icons.iFaPlus}</span>
          </Button>
        </Title>
        <section className="flex flex-col gap-2 max-h-[120px] overflow-y-auto  scrollbar-thin scrollbar-thumb-orange-100 scrollbar-track-gray-400 border-t border-b ">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="text-xs grid grid-cols-5 gap-2  ">
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient.name}
                name="name"
                onChange={(e) => handleIngredientChange(e, index)}
                required
                className="text-xs col-span-2"
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                name="quantity"
                onChange={(e) => handleIngredientChange(e, index)}
                required
                className="text-xs col-span-2"
                autoComplete="off"
              />
              <Button type="button" onClick={() => removeIngredient(index)} style="hover:bg-orange-200">
                {icons.iFaTrash}
              </Button>
            </div>
          ))}
        </section>

        <div className="flex items-center justify-center gap-2 ">
          <Button type="button" style="w-full border-orange-200 hover:bg-orange-200 text-sm" onClick={(e) => toggleModal(e)}>
            Cancel
          </Button>
          <Button type="submit" style="w-full bg-orange-200 text-sm">
            Create Recipe
          </Button>
        </div>
      </section>
      <section className="md:block hidden flex-1 relative rounded-tr-lg rounded-br-lg  ">
        <img loading = "lazy" src = {bgs2[Math.floor(Math.random() * bgs2.length)]} alt = "background" className=" absolute top-0 left-0 w-full h-full  rotate-3 border-8 border-orange-100 object-cover  rounded-tr-lg rounded-br-lg hover:scale-105 duration-200 transition-all  "  style={{filter:"drop-shadow(0 0 0 rgba(0,0,0,0.8)"}}></img>
        <img loading = "lazy" src = {bgs2[Math.floor(Math.random() * bgs2.length)]} alt = "background" className=" absolute top-0 left-0 w-full h-full  rotate-6 border-8 border-orange-100 object-cover  rounded-tr-lg rounded-br-lg hover:scale-105 duration-200 transition-all  "  style={{filter:"drop-shadow(0 0 0 rgba(0,0,0,0.8)"}}></img>
        <img loading = "lazy" src = {bgs2[Math.floor(Math.random() * bgs2.length)]} alt = "background" className=" absolute top-0 left-0 w-full h-full  rotate-12 border-8 border-orange-100 object-cover  rounded-tr-lg rounded-br-lg hover:scale-105 duration-200 transition-all  "  style={{filter:"drop-shadow(0 0 0 rgba(0,0,0,0.8)"}}></img>
        {/* <img loading = "lazy" src = {wife} alt = "background" className="absolute bottom-0 left-0 w-full  z-50  rounded-tr-lg rounded-br-lg" style={{filter:"drop-shadow(0 0 0 rgba(0,0,0,0.8)"}}></img> */}
      </section>
    </form>
  );
};

export default CreateRecipe;
