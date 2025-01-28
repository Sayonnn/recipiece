import { typeRecipe } from "../providers/TypeProvider";
import { icons } from "../utils/icons";
import { useGraphQL } from "../contexts/graphql";
import { useState } from "react";

function Recipe({ recipe }: typeRecipe) {
  const { removeRecipe, toggleViewer, toggleEditor } = useGraphQL();

  const [user] = useState(() => {
    return localStorage.getItem("user") || "";
  });

  return (
    <li
      className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition duration-200"
      key={recipe.id}
    >
      <span className="font-roboto  w-full flex justify-between items-center ">
        <span className="text-[10px] rounded-tr-md bg-white p-1 border-l border-t  ">
          {/* {recipe.creator} */}
        </span>
        {user === "admin" && (
          <div className="flex gap-2">
            <span
              className="p-1 rounded-tl-md text-orange-900 bg-white border-r border-t cursor-pointer"
              onClick={() => toggleEditor({ recipe })}
            >
              {icons.iFaEdit}
            </span>
            <span
              className="p-1 rounded-tl-md text-orange-900 bg-white border-r border-t cursor-pointer"
              onClick={() => removeRecipe(recipe.id)}
            >
              {icons.iFaTrash}
            </span>
          </div>
        )}
      </span>
      <span className="" onClick={() => toggleViewer({ recipe })}>
        <h1 className="font-greatVibe md:text-xl text-2xl border-b border-l border-r p-4 text-center bg-white rounded-br-md rounded-bl-md">
          {recipe.recipeName}
        </h1>
      </span>
    </li>
  );
}

export default Recipe;
