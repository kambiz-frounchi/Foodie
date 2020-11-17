import React, { useState, useEffect } from "react";
import API from "../utils/API";
import TagControl from "../components/TagControl";
import Creatable from "../components/Creatable";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";

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
    <div style={{ padding: "20px" }}>
      <h1>Recipe Matcher™</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Row} controlId="formHorizontalIngredients">
          <Form.Label column sm={2}>
            Ingredients
          </Form.Label>
          <Col sm={2}>
            <TagControl
              items={ingredients}
              label="Ingredient"
              onChange={(event, value) => handleIngredientChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCuisines">
          <Form.Label column sm={2}>
            Cuisines
          </Form.Label>
          <Col sm={2}>
            <TagControl
              items={cuisines}
              label="Cuisine"
              onChange={(event, value) => handleCuisineChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalTags">
          <Form.Label column sm={2}>
            Tags
          </Form.Label>
          <Col sm={2}>
            <TagControl
              items={tags}
              label="Tag"
              onChange={(event, value) => handleTagChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
              Find Recipes
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Container>
        {recipes.length ? (
          <ListGroup>
            {recipes.map((recipe) => (
              <ListGroup.Item key={recipe._id} style={{border: "none"}}>
                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <FeedRecipe
                      createdDate={recipe.createdDate}
                      id={recipe._id}
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
          <h3> No results </h3>
        )}
        <br />
        <br />
      </Container>
    </div>
  );
}

export default FindRecipe;
