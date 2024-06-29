import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useDeleteRecipe = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (recipe) => {
    setCurrentRecipe(recipe);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (updateRecipes, updateFilteredRecipes) => {
    try {
      await axios.delete(`http://localhost:5000/desserts/${currentRecipe.id}`);
      updateRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== currentRecipe.id)
      );
      updateFilteredRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== currentRecipe.id)
      );
      setIsDeleteModalOpen(false);
      navigate("/desserts");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setIsDeleteModalOpen(false);
      throw error;
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    isDeleteModalOpen,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};

export default useDeleteRecipe;
