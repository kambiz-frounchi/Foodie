import React, { useState, useEffect } from "react";
import Header from "../Header";
import { ListGroup, Badge } from "react-bootstrap";

export default function RecipeContent(props) {
    return(
        <div>
            <h1>{props.name}</h1>
            <img src="{props.image}" alt="Recipe Name"></img>
            <p>Recipe Description</p>
            <Badge pill variant="light">Recipe Time</Badge>{' '}
            <Badge pill variant="info">Recipe Difficulty</Badge>{' '}
            <Badge pill variant="primary">Recipe Category</Badge>{' '}
            <h3>Ingredients:</h3>
            <ListGroup>
            <ListGroup.Item>Ingredient</ListGroup.Item>
            <ListGroup.Item>Ingredient</ListGroup.Item>
            <ListGroup.Item>Ingredient</ListGroup.Item>
            <ListGroup.Item>Ingredient</ListGroup.Item>
            <ListGroup.Item>Ingredient</ListGroup.Item>
            </ListGroup>
            <h3>Tags:</h3>
            <ListGroup>
            <ListGroup.Item>Tag</ListGroup.Item>
            <ListGroup.Item>Tag</ListGroup.Item>
            <ListGroup.Item>Tag</ListGroup.Item>
            <ListGroup.Item>Tag</ListGroup.Item>
            <ListGroup.Item>Tag</ListGroup.Item>
            </ListGroup>
        </div>
    )

}

