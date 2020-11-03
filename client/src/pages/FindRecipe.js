import React, { useState, useEffect } from "react";
import API from "../utils/API";
import TagControl from "../components/TagControl";
import Creatable from "../components/Creatable"
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

function FindRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [tags, setTags] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadIngredients();
    loadCuisines();
    loadTags();
  }, []);

  function loadIngredients() {
    API.getAllIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  }

  function loadCuisines() {
    API.getAllCuisines()
      .then((res) => setCuisines(res.data))
      .catch((err) => console.log(err));
  }

  function loadTags() {
    API.getAllTags()
      .then((res) => setTags(res.data))
      .catch((err) => console.log(err));
  }

  function handleIngredientChange(value) {
    setFormObject({ ...formObject, ["ingredientList"]: value });
  }

  function handleCuisineChange(value) {
    setFormObject({ ...formObject, ["cuisineList"]: value });
  }

  function handleTagChange(value) {
    setFormObject({ ...formObject, ["tagList"]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    API.findRecipes({
      ingredients: formObject.ingredientList,
      cuisines: formObject.cuisineList,
      tags: formObject.tagList,
    })
      .then((res) => {
        console.log(res);
        setRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Find Recipes</h1>
      <br />
      <Creatable items={ingredients}/>
      <TagControl
        items={ingredients}
        label="Ingredient"
        onChange={(event, value) => handleIngredientChange(value)}
      />
      <br />
      <TagControl
        items={cuisines}
        label="Cuisine"
        onChange={(event, value) => handleCuisineChange(value)}
      />
      <br />
      <TagControl
        items={tags}
        label="Tag"
        onChange={(event, value) => handleTagChange(value)}
      />
      <br />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleFormSubmit}
      >
        Search
      </button>
      <Container>
        {recipes.length ? (
          <ListGroup>
            {recipes.map((recipe) => (
              <ListGroup.Item key={recipe._id}>
                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <FeedRecipe
                      name={recipe.name}
                      nickname={recipe.user.nickname}
                      img={recipe.image}
                      description={recipe.description}
                    />
                  </Col>
                  <Col md={4}></Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <h3> Feed is empty </h3>
        )}
        <br />
        <br />
      </Container>
    </div>
  );
}

export default FindRecipe;
