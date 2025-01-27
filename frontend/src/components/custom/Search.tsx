import React, { useEffect } from "react";
import { useGraphQL } from "../../contexts/graphql";
import { icons } from "../../utils/icons";

function Search() {
  const [search, setSearch] = React.useState<string>("");
  const {recipes,setRecipesClone} = useGraphQL();

  useEffect(() => {
    if(search === "") {
      const newRecipes = recipes.slice(0, 5);
      setRecipesClone(newRecipes);
      return;
    }
    const searchResults = recipes.filter((recipe) => {
      return recipe?.recipeName.toLowerCase().includes(search.toLowerCase());
    });
    setRecipesClone(searchResults);
  }
  , [search, recipes]);

  return (
    <span className="flex items-stretch justify-center  cursor-pointer border flex-row-reverse rounded-md">
      <span className=" p-2  bg-orange-50" style={{ borderRadius: "inherit" }}>
        {icons.iSearchLine}
      </span>
      <input
        placeholder="Search..."
        name="ingredient"
        onChange={(e) => setSearch(e.target.value)}
        className="font-normal font-sm focus:shadow-md focus:outline-none border-none"
      ></input>
    </span>
  );
}

export default Search;
