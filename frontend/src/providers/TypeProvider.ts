export interface Ingredient {
  name: string;
  quantity: string;
}

export interface TypeRecipe {
  id: string;
  recipeName: string;
  description: string | null;
  createdAt: string;
  thumbsUp: number;
  thumbsDown: number;
  ingredients: Ingredient[];
}

export type typeError = {
  status: number;
  message: string;
};
export type typeStatus = number