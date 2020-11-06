import React, { useState, useEffect, useContext } from "react";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import UserContext from "../utils/userContext";

function Feed(props) {
  const [recipes, setRecipes] = useState([]);
  const { loggedInState } = useContext(UserContext);
  let recipesArray = [];
  let userRecipeStates = [];

  useEffect(() => {
    loadRecipes();
    console.log("feed");
    console.log(loggedInState);
  }, []);

  function loadRecipes() {
    API.getUserRecipeState(loggedInState.id)
      .then((res) => {
        console.log(res);
        userRecipeStates = [...res.data];

        API.getAllRecipes()
          .then((res) => {
            //console.log(res.data);
            recipesArray = [...res.data];
            console.log(recipesArray);
            //this has to be improved if there is scale involved
            for (let i = 0; i < recipesArray.length; i++) {
              recipesArray[i].nickname = recipesArray[i].user ? recipesArray[i].user.nickname : "unknown";
              for (let j = 0; j < userRecipeStates.length; j++) {
                if (recipesArray[i]._id === userRecipeStates[j].recipeId) {
                  recipesArray[i].likeState = userRecipeStates[j].likeStatus;
                  console.log(recipesArray[i]);
                }
              }
            }

            console.log(recipesArray);
            setRecipes(recipesArray);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      {recipes.length ? (
        <ListGroup>
          {recipes.map((recipe) => (
            <ListGroup.Item key={recipe._id}>
              <Row>
                <Col md={4}></Col>
                <Col md={4}>
                  <FeedRecipe
                    id={recipe._id}
                    name={recipe.name}
                    nickname={recipe.nickname}
                    img={recipe.image}
                    description={recipe.description}
                    recipeId={recipe._id}
                    userId={loggedInState.id}
                    likeState={recipe.likeState}
                    likeCounter={recipe.likes}
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
    </Container>
  );
}

export default Feed;
