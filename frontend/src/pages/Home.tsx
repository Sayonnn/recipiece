/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import CreateRecipe from "../components/CreateRecipe";
import NavBar from "../components/NavBar";
import RecipeList from "../components/RecipeList";
import UpdateRecipe from "../components/UpdateRecipe";
import { TypeRecipe } from "../providers/TypeProvider";

const Home = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [recipe,setRecipe] = useState<TypeRecipe>()

    const toggleUpdateState = (recipe:TypeRecipe) => {
        setIsUpdating(!isUpdating);
        setRecipe(recipe)
    }
    
  return (
    <main className={`px-20`}>
      <NavBar />
      <section className={`grid grid-cols-12 place-content-center gap-2`}>
        <RecipeList toggleUpdateState ={toggleUpdateState}/>
        {(isUpdating && recipe )? <UpdateRecipe recipe = {recipe}/> : <CreateRecipe />}
      </section>
    </main>
  );
};

export default Home;
