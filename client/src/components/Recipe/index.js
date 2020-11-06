import React from "react";
import {useHistory} from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";

export default function RecipeContent(props) {
  const history = useHistory();

  if (!props.ingredients) return null;
  if (!props.tags) return null;
  if (!props.cuisines) return null;

  return (
    <div>
      <a href="#" onClick={() => history.goBack()}><h6><i class="fas fa-chevron-left fa-2x"></i>&nbsp; Back</h6></a>
      <br/><br/>
      <h1>{props.name}</h1>
      <h6>By {props.nickname}</h6>
      <img
        width="500"
        src={`/api/recipes/images/${props.img}`}
        alt={props.name}
      ></img>
      <br/><br/>
      <Badge pill variant="secondary">
        Time: {props.time} mins
      </Badge>
      &nbsp;
      <Badge pill variant="info">
        Difficulty: {props.difficulty}
      </Badge>
      &nbsp;
      <Badge pill variant="primary">
        {props.cuisine}
      </Badge>
      <br/><br/>
      <h6>Cuisines:</h6>
      <ListGroup>
        {props.cuisines.map((cuisine) => (
          <ListGroup.Item key={cuisine._id}>{cuisine.name}</ListGroup.Item>
        ))}
      </ListGroup>
      <br/>
      <h6>Ingredients:</h6>
      <ListGroup>
        {props.ingredients.map((ingredient) => (
          <ListGroup.Item key={ingredient._id}>
            {ingredient.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br/>
      <h6>Tags:</h6>
      <ListGroup>
        {props.tags.map((tag) => (
          <ListGroup.Item key={tag._id}>{tag.name}</ListGroup.Item>
        ))}
      </ListGroup>
      <br/>
      <p>{props.description}</p>
    </div>
  );
}
