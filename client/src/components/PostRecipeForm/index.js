import React from "react";
import { Dropdown } from 'react-bootstrap';

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleRecipe">{props.name}</label>
      <input {...props} className="form-control" />
    </div>
  );
}

export function RecipeNameInput(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleRecipe1">Recipe Name</label>
      <input
        {...props}
        name="recipeName"
        type="string"
        className="form-control"
        id="recipe-name"
        placeholder="Name"
      />
    </div>
  );
}
// export function RecipeImageInput(props) {
//   return (
    
//   );
// }

export function RecipeTimeDropdown(props) {
  return (
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Time
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item >10-20</Dropdown.Item>
        <Dropdown.Item >20-30</Dropdown.Item>
        <Dropdown.Item >30-40</Dropdown.Item>
        <Dropdown.Item >40-50</Dropdown.Item>
        <Dropdown.Item >50-60</Dropdown.Item>
        <Dropdown.Item >60+</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      );
}

export function RecipeDifficultyDropdown(props) {
  return (
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Difficulty
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item >Piece of Cake</Dropdown.Item>
    <Dropdown.Item >Some Technique Required</Dropdown.Item>
    <Dropdown.Item >Master Chef Level</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  );
}

// export function RecipeCuisineInput(props) {
//     return (
// 
//     );
//   }



export function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}


export default function PostRecipeForm(props){
    return (
    <div>
        <RecipeNameInput/>
        <RecipeTimeDropdown/>
        <RecipeDifficultyDropdown/>
        <FormBtn/>
        </div>
    )
}
