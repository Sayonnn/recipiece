import RecipeList from "../components/RecipeList";
import bg from "../assets/images/bg.png";
import AddButton from "../components/custom/AddButton";
import CreateRecipe from "../components/crud/CreateRecipe";
import Modal from "../components/Modal";
import { useGraphQL } from "../contexts/graphql";
import ViewRecipe from "../components/crud/ViewRecipe";
import UpdateRecipe from "../components/crud/UpdateRecipe";

const Home = () => {
  const { toggleModal, isModalOpen, isViewerOpen,isEditorOpen } = useGraphQL();

  return (
    <main className={`md:px-40 px-0 relative `}>
      <section className={`grid grid-cols-12 place-content-center gap-2`}>
        <RecipeList />
        <img
          src={bg}
          className="object-cover w-full h-screen fixed left-0 top-0"
        />
      </section>
      <AddButton openModal={toggleModal} />
      {isModalOpen && (
        <Modal>
          <CreateRecipe closeModal={toggleModal} />
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
    </main>
  );
};

export default Home;
