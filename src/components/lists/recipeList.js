import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./recipeList.css";
import { BiDetail } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const navigateToRecipe = (recipe) => {
    navigate(`/desserts/${recipe.id}`, { state: { recipe } });
  };

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
    <div className="RecipeList">
      {recipes.length === 0 ? (
        <div className="no-data">No result available!</div>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe">
            <div
              className="recipe-photo"
              onClick={() => navigateToRecipe(recipe)}
            >
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className="recipe-details">
              <div className="title-price">
                <h3 className="price">
                  <mark>${parseFloat(recipe.price).toFixed(2)}</mark>
                </h3>
                <h3 className="title">{recipe.name}</h3>
              </div>

              <p>
                {expandedId === recipe.id
                  ? recipe.description
                  : `${recipe.description.slice(0, 119)}`}
                {recipe.description.length > 120 && (
                  <button
                    className="read-more"
                    onClick={() => toggleDescription(recipe.id)}
                  >
                    {expandedId === recipe.id ? "Read Less" : "...Read More"}
                  </button>
                )}
              </p>
            </div>
            <div className="actions-button">
              <button
                onClick={() => navigateToRecipe(recipe)}
                className="edit-b"
              >
                <BiDetail className="detail-icon" />
                Details
              </button>
              <button onClick={() => onEdit(recipe)} className="edit-b">
                <CiEdit className="edit-i" />
                Edit
              </button>
              <button onClick={() => onDelete(recipe.id)} className="delete-b">
                <RiDeleteBin6Line className="delete-i" />
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
