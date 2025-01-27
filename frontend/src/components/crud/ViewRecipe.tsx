import React, { useEffect, useState } from "react";
import { bgs, bgs2 } from "../../providers/DataProvider";
import logo from "../../assets/images/4.png";

import { useGraphQL } from "../../contexts/graphql";

const ViewRecipe: React.FC = () => {
  const { recipe, closeViewer } = useGraphQL();
  const [currentBG, setCurrentBG] = useState(bgs[0]);
  const [currentTMP, setCurrentTMP] = useState(bgs2[0]);

  useEffect(() => {
    setCurrentBG(() => {
      return bgs[Math.floor(Math.random() * bgs.length)];
    });
    setCurrentTMP(() => {
      return bgs2[Math.floor(Math.random() * bgs2.length)];
    });
  }, []);

  return (
    <section
      className="flex md:flex-row flex-col-reverse md:gap-2 gap-4 p-4 rounded-lg bg-none md:max-h-[400px] md:min-h-[400px]  max-h-[800px]  min-h-[400px] w-full md:w-[800px]  "
      onDoubleClick={closeViewer}
    >
      <div
        className={`flex-1 rounded-md md:p-4 p-0 relative bg-white   overflow-y-hidden scrollbar-sm scrollbar-none`}
      >
        {/* bg blur image */}
        <img
          src={currentBG}
          draggable={false}
          className="absolute top-0 left-0 md:w-full md:h-full  object-cover blur-md"
        ></img>
         <img
          src={logo}
          className="z-50 absolute bottom-0 right-0 h-[200px] w-[200px] opacity-60 md:hidden block"
          style={{
            filter: "drop-shadow(0 10px 0px rgba(255,255,255,0.7)",
          }}
        ></img>
        <div className="z-50 relative bg-orange-50 bg-opacity-80 p-4 rounded-lg max-h-full md:min-h-full min-h-[400px] overflow-y-auto scrollbar-none">
          <div className="relative bg-container overflow-visible">
            <h1 className="font-greatVibe md:text-6xl text-4xl font-bold sticky top-0  rounded-lg z-10">
              {recipe?.recipe.recipeName}
            </h1>
          </div>
          <p
            className="text-sm mt-4 max-w-[500px] "
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            <strong>Procedure: </strong>
            <p className={`text-xs`}>{recipe?.recipe.description}</p>
          </p>
          <p className="text-sm mt-2 font-bold">Ingredients 🍽️ </p>
          <ul className="max-h-[220px]  overflow-y-auto md:mt-2 mt-4">
            {recipe?.recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-xs ">
                🥣. {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* right */}
      <div
        className={`relative md:flex-1 flex-none overflow-hidden rounded-lg shadow-lg hidden md:block`}
      >
        {/* logo image */}
        <img
          src={logo}
          className="z-50 absolute bottom-0 right-0 h-[200px] w-[200px] opacity-60"
          style={{
            filter: "drop-shadow(0 10px 0px rgba(255,255,255,0.7)",
          }}
        ></img>
        {/* bg image */}
        <img
          src={currentTMP}
          draggable={false}
          className="absolute top-0 left-0 md:w-full md:h-full  object-cover hover:scale-110 transition duration-200"
        ></img>
        <div className="bg-orange-200 border-t-[20px] border-orange-50 absolute w-full h-full -rotate-45 left-[50%] bottom-[-50%] "></div>
      </div>
    </section>
  );
};

export default ViewRecipe;
