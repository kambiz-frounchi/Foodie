import React, { useState, useEffect } from "react";
import API from "../utils/API";

function PostRecipe () {
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.userId) {
          API.postRecipe({
            userId: formObject.userId,
            createdDate: ?
            name: formObject.name,
            image: formObject.image,
            time: formObject.time,
            difficulty: formObject.difficulty,
            cuisine: formObject.cuisine.type,
            ingredients: formObject.ingredients,
            tags: formObject.tags

          })
            .then(res => loadRecipes())
            .catch(err => console.log(err));
        }
      };
    return null;
}

export default PostRecipe;