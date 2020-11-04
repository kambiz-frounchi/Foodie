import React, { useState, useEffect, useContext } from "react";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import UserContext from "../utils/userContext";

function Feed(props) {
  const [recipes, setRecipes] = useState([]);
  const { loggedInState } = useContext(UserContext);

  useEffect(() => {
    loadRecipes();
    console.log("feed");
    console.log(loggedInState);
  }, []);

  function loadRecipes() {
    API.getAllRecipes()
      .then((res) => {
        setRecipes(res.data);
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
                    name={recipe.name}
                    nickname= {loggedInState.nickname}
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
        <h3> Feed is empty </h3>
      )}
    </Container>
  );
}

export default Feed;
