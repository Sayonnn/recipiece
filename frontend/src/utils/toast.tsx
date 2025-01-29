import { toast } from "react-toastify";

export const toasts = {
  welcomeToast: () =>
    toast(
      "Welcome to the Recipiece, your number one cooking companion! You can view, create, update and delete recipes. Click on the add button to create a new recipe. Click on a recipe to view its details and just double click to close it.",
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    ),
};
