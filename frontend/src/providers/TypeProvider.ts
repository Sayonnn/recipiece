import { ReactNode } from "react";

export interface Ingredient {
  name: string;
  quantity: string;
}

export type TypeRecipes = {
  id: string;
  recipeName: string;
  description: string | null;
  createdAt: string;
  thumbsUp: number;
  thumbsDown: number;
  ingredients: Ingredient[];
}
export type typeRecipe = {
  creator?: string;
  recipe: TypeRecipes;
}

export type typeError = {
  status: number;
  message: string;
};
export type typeStatus = number

export type typeAcc = {
  username: string;
  password: string;
}

export type typeChildren = {
  children: ReactNode;
}

export type GraphQLContextType = {
  recipes: TypeRecipes[];
  removeRecipe: (id: string) => void;
  addRecipe: (name:string,description:string,ingredients:Ingredient[]) => void;
  editRecipe: (id:string,name:string,description:string,ingredients:Ingredient[]) => void;
  toggleModal:() => void;
  isModalOpen:boolean;
  toggleViewer:(recipe:typeRecipe) => void;
  toggleEditor:(recipe:typeRecipe) => void;
  closeEditor:() => void;
  closeViewer:() => void;
  isEditorOpen:boolean;
  isViewerOpen:boolean;
  recipe?: typeRecipe;
  recipesClone:TypeRecipes[];
  setRecipesClone:(recipes:TypeRecipes[]) => void;
};

export type typeAddButton = {
  openModal: () => void;
}

export type typeCreateRecipe = {
  closeModal: () => void;
}