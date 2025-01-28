/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Recipe from "./Recipe";
import { useGraphQL } from "../contexts/graphql";
import Pagination from "./Pagination";

const RecipeList: React.FC = () => {
  const { recipes,recipesClone, setRecipesClone } = useGraphQL();
  const boundary = 5; // serve as the recipe appearance limit
  const [start, setStart] = React.useState(0);
  const [offset, setOffset] = React.useState(boundary);
  const [currentPage, setCurrentPage] = React.useState(1);

  const navigatePage = (page: number) => {
    setStart(page * boundary - boundary);
    setOffset(page * boundary);
    setCurrentPage(page);
  };

  useEffect(() => {
    const newRecipes = recipes.slice(start, offset);
    setRecipesClone(newRecipes);
  }, [recipes, currentPage]);

 

  return (
    <div className="col-span-12  p-4 z-20">
      <NavBar />
      <Pagination
        navigatePage={navigatePage}
        currentPage={currentPage}
        boundary={boundary}
      />
      <ul className="grid md:grid-cols-4 grid-cols-2 gap-2 py-2 ">
        {recipesClone.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
