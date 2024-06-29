import React, { useState, useEffect } from "react";
import RecipeList from "../components/lists/recipeList";
import SearchBar from "../components/search/searchBar";
import RecipeForm from "../components/form/recipeForm";
import axios from "axios";
import { CgAdd } from "react-icons/cg";
import "./items.css";
import Modal from "../components/modal";
import useAddEditRecipe from "../hooks/useAddEditRecipe";
import useDeleteRecipe from "../hooks/useDeleteRecipe";
import DeleteRecipe from "../components/deleteRecipe";

const Items = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const {
    currentRecipe,
    isModalOpen,
    handleEdit,
    addEditRecipe,
    setIsModalOpen,
    setCurrentRecipe,
  } = useAddEditRecipe();
  const {
    isDeleteModalOpen,
    handleDelete,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDeleteRecipe();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/desserts");
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleAdd = () => {
    setCurrentRecipe(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="items">
        <div className="header">
          <div className="search-div">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="add-button">
            <button onClick={handleAdd}>
              <CgAdd className="add-icon" />
              Add
            </button>
          </div>
        </div>
        <RecipeList
          recipes={filteredRecipes}
          onEdit={handleEdit}
          onDelete={(id) => handleDelete({ id })}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm
          onSave={(recipe) =>
            addEditRecipe(recipe, setRecipes, setFilteredRecipes)
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
    </>
  );
};

export default Items;
