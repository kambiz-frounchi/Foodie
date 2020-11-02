import React from "react";
import { Dropdown } from "react-bootstrap";
import FileUpload from "../FileUpload";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

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
  return (
    <Input {...props} name="name" ></Input>
  );
}

function RecipeTimeDropdown(props) {
  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Time
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item name="time" data-value="10-20">10-20</Dropdown.Item>
        <Dropdown.Item name="time" data-value="20-30">20-30</Dropdown.Item>
        <Dropdown.Item name="time" data-value="30-40">30-40</Dropdown.Item>
        <Dropdown.Item name="time" data-value="40-50">40-50</Dropdown.Item>
        <Dropdown.Item name="time" data-value="50-60">50-60</Dropdown.Item>
        <Dropdown.Item name="time" data-value="60+">60+</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function RecipeDifficultyDropdown(props) {
  return (
    <Dropdown onSelect={props.onSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Difficulty
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item name="difficulty" data-value="Piece of Cake">Piece of Cake</Dropdown.Item>
        <Dropdown.Item name="difficulty" data-value="Some Technique Required">Some Technique Required</Dropdown.Item>
        <Dropdown.Item name="difficulty" data-value="Master Chef Level">Master Chef Level</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default function PostRecipeForm(props) {

  return (
    <Form onSubmit={props.onSubmit}>
      <RecipeNameInput {...props}/>
      <RecipeTimeDropdown {...props}/>
      <RecipeDifficultyDropdown {...props}/>
      <Button variant="primary" type="submit">Add Recipe</Button>
      <FileUpload onChange={props.fileSelectHandler} />
    </Form>
  );
}
