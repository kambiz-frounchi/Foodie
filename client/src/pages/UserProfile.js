import React, { useState, useEffect, useContext } from "react";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import UserContext from "../utils/userContext";

function UserProfile() {
  const [recipes, setRecipes] = useState([]);
  const { loggedInState } = useContext(UserContext);
  let recipesArray = [];
  let userRecipeStates = [];

  useEffect(() => {
    console.log(loggedInState);
    loadRecipesByUser();
  }, []);

  function loadRecipesByUser() {
    /*
    API.getUserRecipes(loggedInState.id)
      .then((res) => {
          console.log(res.data);
          setRecipes(res.data)})
      .catch((err) => console.log(err));
    */
    API.getUserRecipeState(loggedInState.id)
      .then((res) => {
        console.log(res);
        userRecipeStates = [...res.data];

        API.getUserRecipes(loggedInState.id)
          .then((res) => {
            console.log(res);
            recipesArray = [...res.data];
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

  /*
  const headerStyle = {
      color: "gray",
      "font-family": "sans-serif"
  }
  */

  return (
    <Container>
      {/* <Row>
        <Col md={4}> </Col>
        <Col md={4}>
          <h3 style={headerStyle}> {loggedInState.nickname}'s posts </h3>
        </Col>
        <Col md={4}> </Col>
      </Row> */}
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
                    nickname={recipe.nickname}
                    img={recipe.image}
                    description={recipe.description}
                    recipeId={recipe._id}
                    userId={loggedInState.id}
                    likeState={recipe.likeState}
                    likeCounter={recipe.likes}
                    likeDisabled={true}
                  />
                </Col>
                <Col md={4}></Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <h3> no user posts! </h3>
      )}
    </Container>
  );
}

export default UserProfile;
