import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./recipeForm.css"; // Import the CSS file for styling

const RecipeForm = ({ onSave, initialRecipe }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialRecipe) {
      setName(initialRecipe.name || "");
      setDescription(initialRecipe.description || "");
      setPrice(initialRecipe.price || "");
      setImageUrl(initialRecipe.imageUrl || "");
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    }
  }, [initialRecipe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newRecipe = {
        id: initialRecipe?.id,
        name,
        description,
        price,
        imageUrl,
      };

      await onSave(newRecipe);

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");

      toast.success("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("Error saving recipe. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter the recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter the price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter the recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter the URL for the recipe image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        {imageUrl && (
          <div className="form-group image-preview">
            <img src={imageUrl} alt="Recipe" />
          </div>
        )}
        <div className="button-div">
          <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RecipeForm;


