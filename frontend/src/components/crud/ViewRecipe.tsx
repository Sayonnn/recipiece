import React,{useEffect, useState} from "react";
import { bgs } from "../../providers/DataProvider";
import logo from '../../assets/images/4.png'

import { useGraphQL } from "../../contexts/graphql";

const ViewRecipe: React.FC = () => {
  const { recipe ,closeViewer} = useGraphQL();
  const [currentBG, setCurrentBG] = useState(bgs[0])

  useEffect(() => {
    setCurrentBG(() => {
      return bgs[Math.floor(Math.random() * bgs.length)]
    })
  },[])

  return (
    <section className="flex gap-2 p-4 max-h-[400px] min-h-[400px] w-full md:w-[800px] rounded-lg bg-orange-50" onClick={closeViewer}>
      <div className={`flex-1 `}>
        <h1 className="font-greatVibe text-6xl font-bold">{recipe?.recipe.recipeName}</h1>
        <p className="text-sm mt-2">Procedure: {recipe?.recipe.description}</p>
        <p className="text-sm mt-2">Ingredients</p>
        <ul>
          {recipe?.recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-xs ">
              {index+1}. {ingredient.name} - {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className = {`relative flex-1 overflow-hidden rounded-lg shadow-lg`}>
        <img src={logo} className="z-50 absolute bottom-0 right-0 h-[200px] w-[200px] opacity-60" style={{
          filter:"drop-shadow(0 10px 0px rgba(255,255,255,0.7)"
        }}></img>

        <img src={currentBG} className="absolute top-0 left-0 w-full h-full object-cover hover:scale-110 transition duration-200" ></img>
        <div className="bg-orange-200 border-t-[20px] border-orange-50 absolute w-full h-full -rotate-45 left-[50%] bottom-[-50%] ">

        </div>
          laud zion cascalla

      </div>
    </section>
  );
};

export default ViewRecipe;
