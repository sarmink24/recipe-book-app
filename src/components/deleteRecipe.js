import React from "react";
import "./deleteRecipe.css";

const DeleteRecipe = ({ onClose, onConfirm }) => (
  <div className="delete-modal">
    <h3>Are you sure you want to delete this recipe?</h3>
    <div className="button-group">
      <button type="close" onClick={onClose}>
        No
      </button>
      <button type="submit" onClick={onConfirm}>
        Yes
      </button>
    </div>
  </div>
);

export default DeleteRecipe;