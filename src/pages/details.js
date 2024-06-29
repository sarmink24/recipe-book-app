import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./details.css";
import RecipeDetails from "../components/details/recipeDetails";
import RecipeForm from "../components/form/recipeForm";
import Modal from "../components/modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAddEditRecipe from "../hooks/useAddEditRecipe";
import useDeleteRecipe from "../hooks/useDeleteRecipe";
import DeleteRecipe from "../components/deleteRecipe";

const Details = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const [recipes, setRecipes] = useState(recipe ? [recipe] : []);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  const {
    currentRecipe,
    isModalOpen,
    handleEdit,
    saveRecipe,
    setIsModalOpen,
    setCurrentRecipe,
  } = useAddEditRecipe(recipe);

  const {
    isDeleteModalOpen,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteRecipe();

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <div className="details-page">
        <RecipeDetails
          recipe={currentRecipe}
          onEdit={handleEdit}
          onDelete={(id) => handleDelete({ id })}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          onSave={(recipe) =>
            saveRecipe(recipe, setRecipes, setFilteredRecipes)
          }
          initialRecipe={currentRecipe}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <DeleteRecipe
          onConfirm={() => handleDeleteConfirm(setRecipes, setFilteredRecipes)}
          onClose={handleDeleteCancel}
        />
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Details;


