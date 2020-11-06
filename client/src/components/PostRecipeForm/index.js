import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import FileUpload from "../FileUpload";
import Creatable from "../Creatable";
import API from "../../utils/API";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

function Input(props) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={props.name}
        aria-label={props.name}
        aria-describedby="basic-addon1"
        onChange={props.onChange}
        name={props.name}
      />
    </InputGroup>
  );
}

function RecipeNameInput(props) {
  return <Form.Control as="input" onChange={props.onChange} name="name"></Form.Control>;
}

function RecipeDescriptionInput(props) {
  return (
    <Form.Control
      name="description"
      as="textarea"
      onChange={props.onChange}
      rows={5}
      style={{ width: "500px" }}
    />
  );
}

function RecipeTimeDropdown(props) {
  return (
    <>
      <Select id="timeSelect" onChange={props.onSelect.bind(null, "time")}>
        <MenuItem value="10-20">10-20</MenuItem>
        <MenuItem value="20-30">20-30</MenuItem>
        <MenuItem value="30-40">30-40</MenuItem>
        <MenuItem value="40-50">40-50</MenuItem>
        <MenuItem value="50-60">50-60</MenuItem>
        <MenuItem value="60+">60+</MenuItem>
      </Select>
      {/* <Dropdown onSelect={props.onSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Time
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item name="time" data-value="10-20">
            10-20
          </Dropdown.Item>
          <Dropdown.Item name="time" data-value="20-30">
            20-30
          </Dropdown.Item>
          <Dropdown.Item name="time" data-value="30-40">
            30-40
          </Dropdown.Item>
          <Dropdown.Item name="time" data-value="40-50">
            40-50
          </Dropdown.Item>
          <Dropdown.Item name="time" data-value="50-60">
            50-60
          </Dropdown.Item>
          <Dropdown.Item name="time" data-value="60+">
            60+
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
}

function RecipeDifficultyDropdown(props) {
  return (
    <Select
      id="difficultySelect"
      onChange={props.onSelect.bind(null, "difficulty")}
    >
      <MenuItem value="Piece of Cake">Piece of Cake</MenuItem>

      <MenuItem value="Some Technique Required">
        Some Technique Required
      </MenuItem>
      <MenuItem value="Master Chef Level">Master Chef Level</MenuItem>
    </Select>
    // <Dropdown onSelect={props.onSelect}>
    //   <Dropdown.Toggle variant="success" id="dropdown-basic">
    //     Difficulty
    //   </Dropdown.Toggle>

    //   <Dropdown.Menu>
    //     <Dropdown.Item name="difficulty" data-value="Piece of Cake">
    //       Piece of Cake
    //     </Dropdown.Item>
    //     <Dropdown.Item name="difficulty" data-value="Some Technique Required">
    //       Some Technique Required
    //     </Dropdown.Item>
    //     <Dropdown.Item name="difficulty" data-value="Master Chef Level">
    //       Master Chef Level
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
  );
}

export default function PostRecipeForm(props) {
  const [ingredients, setIngredients] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [tags, setTags] = useState([]);

  const [ingredientInput, setIngredientInput] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [cuisineInput, setCuisineInput] = useState([]);
  const [addedCuisines, setAddedCuisines] = useState([]);
  const [tagInput, setTagInput] = useState([]);
  const [addedTags, setAddedTags] = useState([]);

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

  function handleIngredientInputChange(event) {
    setIngredientInput(event.target.value);
  }

  function handleIngredientClick(event) {
    const newIngredient = {
      _id: Math.round(Math.random() * 1000),
      name: ingredientInput,
    };
    setAddedIngredients([...addedIngredients, newIngredient]);
    setIngredients([...ingredients, newIngredient]);
    props.setFormObject({
      ...props.formObject,
      ingredients: [...addedIngredients, newIngredient].map((ingredient) => {
        return ingredient.name;
      }),
    });
  }

  function handleAddableIngredientChange(value) {
    setAddedIngredients(value);
    props.setFormObject({
      ...props.formObject,
      ingredients: value.map((ingredient) => {
        return ingredient.name;
      }),
    });
  }

  function handleCuisineInputChange(event) {
    setCuisineInput(event.target.value);
  }

  function handleCuisineClick(event) {
    const newCuisine = {
      _id: Math.round(Math.random() * 1000),
      name: cuisineInput,
    };
    setAddedCuisines([...addedCuisines, newCuisine]);
    setCuisines([...cuisines, newCuisine]);
    props.setFormObject({
      ...props.formObject,
      cuisines: [...addedCuisines, newCuisine].map((cuisine) => {
        return cuisine.name;
      }),
    });
  }

  function handleAddableCuisineChange(value) {
    setAddedCuisines(value);
    props.setFormObject({
      ...props.formObject,
      cuisines: value.map((cuisine) => {
        return cuisine.name;
      }),
    });
  }

  function handleTagInputChange(event) {
    setTagInput(event.target.value);
  }

  function handleTagClick(event) {
    const newTag = { _id: Math.round(Math.random() * 1000), name: tagInput };
    setAddedTags([...addedTags, newTag]);
    setTags([...tags, newTag]);

    props.setFormObject({
      ...props.formObject,
      tags: [...addedTags, newTag].map((tag) => {
        return tag.name;
      }),
    });
  }

  function handleAddableTagChange(value) {
    setAddedTags(value);
    props.setFormObject({
      ...props.formObject,
      tags: value.map((tag) => {
        return tag.name;
      }),
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <Form onSubmit={props.onSubmit}>
        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={2}>
            <RecipeNameInput {...props} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalImage">
          <Form.Label column sm={2}>
            Image
          </Form.Label>
          <Col sm={2}>
            <FileUpload onChange={props.fileSelectHandler} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalTime">
          <Form.Label column sm={2}>
            Time Required
          </Form.Label>
          <Col sm={2}>
            <RecipeTimeDropdown {...props} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalDifficulty">
          <Form.Label column sm={2}>
            Difficulty
          </Form.Label>
          <Col sm={2}>
            <RecipeDifficultyDropdown {...props} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalIngredients">
          <Form.Label column sm={2}>
            Ingredients
          </Form.Label>
          <Col sm={2}>
            <Creatable
              items={ingredients}
              value={addedIngredients}
              onInputChange={handleIngredientInputChange}
              onClick={handleIngredientClick}
              onChange={(event, value) => handleAddableIngredientChange(value)}
              label="Ingredient"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCuisines">
          <Form.Label column sm={2}>
            Cuisines
          </Form.Label>
          <Col sm={2}>
            <Creatable
              items={cuisines}
              value={addedCuisines}
              onInputChange={handleCuisineInputChange}
              onClick={handleCuisineClick}
              onChange={(event, value) => handleAddableCuisineChange(value)}
              label="Cuisine"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalTags">
          <Form.Label column sm={2}>
            Tags
          </Form.Label>
          <Col sm={2}>
            <Creatable
              items={tags}
              value={addedTags}
              onInputChange={handleTagInputChange}
              onClick={handleTagClick}
              onChange={(event, value) => handleAddableTagChange(value)}
              label="Tag"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={2}>
            <RecipeDescriptionInput {...props}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Add Recipe
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
