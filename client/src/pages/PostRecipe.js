import React, { useState, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import PostRecipeForm from "../components/PostRecipeForm"

function PostRecipe () {
  const { loggedInState }= useContext(UserContext);
  const [formObject, setFormObject] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (loggedInState.userId) {
          API.postRecipe({
            userId: loggedInState.userId,
            createdDate: new Date(),
            name: formObject.name,
            image: formObject.image,
            time: formObject.time,
            difficulty: formObject.difficulty,
            cuisine: formObject.cuisine.name,
            ingredients: formObject.ingredients,
            tags: formObject.tags

          })
            .then(console.log("hello"))
            .catch(err => console.log(err));
        }
      };
    return (
    <PostRecipeForm
      onClick={handleFormSubmit}
      onChange={handleInputChange}
    />
  );
}

export default PostRecipe;