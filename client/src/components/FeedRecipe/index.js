import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import API from "../../utils/API";
import { DateTime } from "luxon";

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
      <Card style={{ width: "25rem" }}>
        <Card.Img
          variant="top"
          src={props.img}
          alt="recipe image"
        />
        <Card.Body>
          <a href={`/recipe/${props.id}`}><Card.Title>{props.name}</Card.Title></a>
          <Card.Subtitle className="mb-2 text-muted">
            by {props.nickname}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {DateTime.fromISO(props.createdDate).toLocaleString(DateTime.DATE_FULL)}
          </Card.Subtitle>
          <Card.Text>{props.description ? props.description.substring(0,100) : ""}...</Card.Text>
          <Button variant="primary" disabled={props.likeDisabled ? true : false} onClick={handleLikeButtonClick}>
            {liked()}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FeedRecipe;
