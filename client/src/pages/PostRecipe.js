import React, { useState, useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import {useHistory} from "react-router-dom";
import PostRecipeForm from "../components/PostRecipeForm";

function PostRecipe() {
  const { loggedInState } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const history = useHistory();

  const handleSelect = (name, event) => {
    const value = event.target.value;
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

    console.log(loggedInState);

    formObject.userId = loggedInState.id;
    formObject.createdDate = new Date();

    for (const [key, value] of Object.entries(formObject)) {
      console.log(key);
      console.log(value);
      formData.append(key, value);
    }

    console.log(formObject);

    console.log("uploading ...");

    API.postRecipe(formData)
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
    <h1 style={{padding: '20px'}}>Post a Recipe</h1>
    <PostRecipeForm setFormObject={setFormObject} formObject={formObject}
      onSubmit={handleFormSubmit}
      onChange={handleInputChange}
      onSelect={handleSelect}
      fileSelectHandler={handleFileSelect}
    />
    </div>
  );
}

export default PostRecipe;
