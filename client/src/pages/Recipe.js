import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import RecipeContent from "../components/Recipe";
import { useLocation } from "react-router-dom";

function Recipe(props) {
  const [recipe, setRecipe] = useState([]);

  const recipeUrl = useLocation().pathname;

  useEffect(() => {
    loadRecipe();
  }, []);

  function loadRecipe() {
    API.getRecipe(recipeUrl.split("/")[2])
      .then((res) => {
        const newRecipe = {
          ...res.data,
          nickname: res.data.user.nickname,
        };
        setRecipe(newRecipe);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item key={recipe._id}>
          <Row>
            <Col md={12}>
              <RecipeContent
                name={recipe.name}
                nickname={recipe.nickname}
                img={recipe.image}
                description={recipe.description}
                ingredients={recipe.ingredients}
                tags={recipe.tags}
                difficulty={recipe.difficulty}
                time={recipe.time}
                cuisines={recipe.cuisines}
              />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
export default Recipe;
