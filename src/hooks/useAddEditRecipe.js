import { useState } from "react";
import axios from "axios";

const useAddEditRecipe = (initialRecipe = null) => {
  const [currentRecipe, setCurrentRecipe] = useState(initialRecipe);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe);
    setIsModalOpen(true);
  };

  const saveRecipe = async (recipe, updateRecipes, updateFilteredRecipes) => {
    try {
      let response;
      if (recipe.id) {
        response = await axios.put(
          `http://localhost:5000/desserts/${recipe.id}`,
          recipe
        );
        updateRecipes((prevRecipes) =>
          prevRecipes.map((r) => (r.id === recipe.id ? response.data : r))
        );
        updateFilteredRecipes((prevRecipes) =>
          prevRecipes.map((r) => (r.id === recipe.id ? response.data : r))
        );
      } else {
        response = await axios.post("http://localhost:5000/desserts", recipe);
        updateRecipes((prevRecipes) => [...prevRecipes, response.data]);
        updateFilteredRecipes((prevRecipes) => [...prevRecipes, response.data]);
      }
      setCurrentRecipe(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  };

  return {
    currentRecipe,
    isModalOpen,
    handleEdit,
    saveRecipe,
    setIsModalOpen,
    setCurrentRecipe,
  };
};

export default useAddEditRecipe;
