import React, { useState, useEffect } from "react";
import API from "../utils/API";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function SearchRecipe() {
  const [recipes, setRecipes] = useState([]);

  const searchUrl = useLocation().pathname;

  useEffect(() => {
    loadResults();
  }, []);

  function loadResults() {
    API.textSearchRecipes({
      search: searchUrl.split("/")[2]
    })
    .then((res) => {
      setRecipes(res.data);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipe Search</h1>
      <Container>
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
                      nickname={recipe.user.nickname}
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
          <h3> No results </h3>
        )}
        <br />
        <br />
      </Container>
    </div>
  );
}

export default SearchRecipe;