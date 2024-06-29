import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./recipeDetails.css";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecipeDetails = ({ recipe, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setExpandedId((prevExpandedId) =>
      prevExpandedId === recipe.id ? null : recipe.id
    );
  };
  const handleGoBack = () => {
    navigate("/desserts");
  };

  return (
    <div key={recipe.id} className="dessert">
      <div className="dessert-photo">
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
      <div className="dessert-details">
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
        <div className="edit-delete">
          <button onClick={() => onEdit(recipe)} className="edit-b">
            <CiEdit className="edit-i" />
            Edit
          </button>
          <button onClick={() => onDelete(recipe.id)} className="delete-b">
            <RiDeleteBin6Line className="delete-i" />
            Delete
          </button>
        </div>
        <div className="go-back">
          <button className="goback-button" onClick={handleGoBack}>
            {"<<"} Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
