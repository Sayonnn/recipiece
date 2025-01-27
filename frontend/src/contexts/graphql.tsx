/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from "react";
import {
  GraphQLContextType,
  Ingredient,
  typeChildren,
  typeRecipe,
  TypeRecipes,
} from "../providers/TypeProvider";
import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES,
  UPDATE_RECIPE,
} from "../graphql/recipeQueries";

import { useMutation, useQuery } from "@apollo/client";

const graphqlContext = createContext<GraphQLContextType | null>(null);

export function GraphQLProvider({ children }: typeChildren) {
  const [recipes, setRecipes] = useState<TypeRecipes[]>([]);
  const [recipe, setRecipe] = useState<typeRecipe>();
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [createRecipe] = useMutation(CREATE_RECIPE);
  const [updateRecipe] = useMutation(UPDATE_RECIPE);
  const [recipesClone, setRecipesClone] = useState<TypeRecipes[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { data, loading, error } = useQuery<{ getRecipes: TypeRecipes[] }>(
    GET_RECIPES,
    {
      variables: { limit: 10, offset: 0 },
    }
  );

  const removeRecipe = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe({
        variables: { id: id },
      });
    } else {
      return;
    }

    setRecipes((prev) => {
      const newRecipes = prev.filter((recipe) => recipe.id !== id);
      return newRecipes;
    });
  };

  const addRecipe = async (
    name: string,
    description: string,
    ingredients: Ingredient[]
  ) => {
    const newName = name.charAt(0).toUpperCase() + name.slice(1, name.length);
    await createRecipe({
      variables: { name: newName, description, ingredients },
    });
    window.location.reload();
  };

  const editRecipe = async (
    id: string,
    name: string,
    description: string,
    ingredients: Ingredient[]
  ) => {

    const newIngredients = ingredients.map((ing) => {
      return {name:ing.name,quantity:ing.quantity}
    })
  
    await updateRecipe({
      variables: { id, name, description, ingredients:newIngredients },
    });

    alert("Updated Successfully")
    closeEditor();
  };

  useEffect(() => {
    if (data?.getRecipes) {
      setRecipes(data.getRecipes);
    }
  }, [data]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleViewer = (recipe: typeRecipe) => {
    setRecipe(recipe);
    setIsViewerOpen(!isViewerOpen);
  };
  const toggleEditor = (recipe: typeRecipe) => {
    setRecipe(recipe);
    setIsEditorOpen(!isEditorOpen);
  };
  const closeViewer = () => {
    setIsViewerOpen(!isViewerOpen);
  };
  const closeEditor = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <graphqlContext.Provider
      value={{
        recipes,
        removeRecipe,
        addRecipe,
        editRecipe,
        toggleViewer,
        toggleModal,
        toggleEditor,
        closeEditor,
        closeViewer,
        isEditorOpen,
        isModalOpen,
        isViewerOpen,
        recipe,
        recipesClone,
        setRecipesClone,
      }}
    >
      {children}
    </graphqlContext.Provider>
  );
}

export function useGraphQL(): GraphQLContextType {
  const context = useContext(graphqlContext);
  if (!context) {
    throw new Error("useGraphQL must be used within a GraphQLProvider");
  }
  return context;
}
