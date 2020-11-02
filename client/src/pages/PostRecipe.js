import React, { useState, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import PostRecipeForm from "../components/PostRecipeForm";

function PostRecipe() {
  const { loggedInState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});

  const handleSelect = (eventKey, event) => {
    const { name } = event.target;
    const value = event.target.dataset.value;
    console.log("handleSelect");
    console.log(name);
    console.log(value);
    setFormObject({ ...formObject, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("handleInputChange");
    //console.log(event.target);
    //console.log(event.target.textContent);
    console.log(name);
    console.log(value);
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFileSelect = (images) => {
    console.log(images[0]);
    setFormObject({ ...formObject, image: images[0] });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("submitHandler");
    const formData = new FormData();

    for (const [key, value] of Object.entries(formObject)) {
      console.log(key);
      console.log(value);
      formData.append(key, value);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("uploading ...");

    console.log(loggedInState);

    //if (loggedInState.userId) {
    //   API.postRecipe({
    //     userId: loggedInState.userId,
    //     createdDate: new Date(),
    //     name: formObject.name,
    //     image: formObject.image,
    //     time: formObject.time,
    //     difficulty: formObject.difficulty,
    //     cuisine: formObject.cuisine.name,
    //     ingredients: formObject.ingredients,
    //     tags: formObject.tags,
    //   })
    API.postRecipe(formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    //}
  };
  return (
    <PostRecipeForm
      onSubmit={handleFormSubmit}
      onChange={handleInputChange}
      onSelect={handleSelect}
      fileSelectHandler={handleFileSelect}
    />
  );
}

export default PostRecipe;
