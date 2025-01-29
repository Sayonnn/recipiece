import RecipeList from "../components/RecipeList";
import bg from "../assets/images/bg.png";
import AddButton from "../components/custom/MenuToggler";
import CreateRecipe from "../components/crud/CreateRecipe";
import Modal from "../components/Modal";
import { useGraphQL } from "../contexts/graphql";
import ViewRecipe from "../components/crud/ViewRecipe";
import UpdateRecipe from "../components/crud/UpdateRecipe";
import { useEffect } from "react";
import { toasts } from "../utils/toast";

const Home = () => {
  const { isModalOpen, isViewerOpen, isEditorOpen } = useGraphQL();

  useEffect(() => {
    const isFirstTime = sessionStorage.getItem("isFirstTime");
    if (isFirstTime === "false") return;
      toasts.welcomeToast();
      setTimeout(() => {
        sessionStorage.setItem("isFirstTime",false.toString());
      },100)
  }, []);

  return (
    <main className={`md:px-40 px-0 relative `}>
      <section className={`grid grid-cols-12 place-content-center gap-2`}>
        <RecipeList />
        <img
          src={bg}
          className="object-cover w-full h-screen fixed left-0 top-0"
        />
      </section>
      {isModalOpen && (
        <Modal>
          <CreateRecipe />
        </Modal>
      )}
      {isViewerOpen && (
        <Modal>
          <ViewRecipe />
        </Modal>
      )}
      {isEditorOpen && (
        <Modal>
          <UpdateRecipe />
        </Modal>
      )}
      <AddButton />
    </main>
  );
};

export default Home;
