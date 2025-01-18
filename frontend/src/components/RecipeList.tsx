/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_RECIPE, GET_RECIPES } from "../graphql/recipeQueries";
import { Link } from "react-router-dom";
import { TypeRecipe } from "../providers/TypeProvider";
import Title from "./custom/Title";
import Button from "./custom/Button";
import { icons } from "../utils/icons";

type  typeRecipeList = {
  toggleUpdateState: (recipe:TypeRecipe) => void
}

const RecipeList: React.FC<typeRecipeList> = ({toggleUpdateState}) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [recipes, setRecipes] = useState<TypeRecipe[]>([]);
  const [query, setQuery] = useState<string>("");
  const { data, loading, error } = useQuery<{ getRecipes: TypeRecipe[] }>(
    GET_RECIPES,
    {
      variables: { limit: 10, offset: 0 },
    }
  );

  const removeRecipe = (id: string) => {
    deleteRecipe({
      variables: { id: id },
    });

    setRecipes((prev) => {
      const newRecipes = prev.filter((recipe) => recipe.id !== id);
      return newRecipes;
    });
  };

  const showUpdatePanel = (recipe:TypeRecipe) => {
    toggleUpdateState(recipe)
  }

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (data?.getRecipes) {
      setRecipes(data.getRecipes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="md:col-span-8 border p-4">
      <Title>
        <span className="flex items-center justify-center gap-2">
          <strong>Recipes</strong>
        </span>
        <span className="flex items-stretch justify-center gap-2 cursor-pointer">
          <span className="border p-2 rounded-lg" onClick={reloadPage}>
            {icons.iReloadLine}
          </span>
          <span className="border p-2 rounded-lg">{icons.iSearchLine}</span>

          <input
            placeholder="Search..."
            name="ingredient"
            value={query}
            className="font-normal font-sm"
          ></input>
        </span>
      </Title>
      <ul className="grid md:grid-cols-3 gap-2 py-2 ">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border p-2 rounded-lg ">
            <Link to={`/recipe/${recipe.id}`}><Title>{recipe.recipeName}</Title></Link>
            <p>{recipe.description}</p>
            <ul className="md:min-h-[50px]">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
            <div className={`flex items-end  justify-end gap-2`}>
              <Button type={"button"} onClick={() => removeRecipe(recipe.id)}>
                Remove
              </Button>
              <Button type="button" onClick={() => showUpdatePanel(recipe)}>
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
