import React, { useState, useEffect, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import API from "../../utils/API";

function FeedRecipe(props) {
  const [likeCounter, setLikeCounter] = useState(
    props.likeCounter ? props.likeCounter : 0
  );
  const [likeState, setLikeState] = useState(
    props.likeState ? props.likeState : false
  );

  function handleLikeButtonClick() {
    if (likeState) {
      setLikeCounter(likeCounter - 1);
    } else {
      setLikeCounter(likeCounter + 1);
    }

    API.likeRecipe(props.recipeId, {
      userId: props.userId,
      recipeId: props.recipeId,
      likeStatus: !likeState,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    setLikeState(!likeState);
  }

  function liked() {
    if (likeState) {
      return `Liked: ${likeCounter}`;
    } else {
      return `Like: ${likeCounter}`;
    }
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`/api/recipes/images/${props.img}`}
          alt="recipe image"
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.nickname}
          </Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary" onClick={handleLikeButtonClick}>
            {liked()}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FeedRecipe;
