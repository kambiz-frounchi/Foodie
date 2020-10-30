import React, { useState, useEffect } from "react";
import FeedRecipe from "../components/FeedRecipe";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";

function Feed(props) {
  
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, [])

  function loadRecipes() {
      API.getAllRecipes()
        .then(res => {
            setRecipes(res.data);
        })
        .catch(err => console.log(err));
  }
  
  return (
    <Container>
        {recipes.length ? (
        <ListGroup>
            {recipes.map(recipe => (
                <ListGroup.Item key={recipe._id}>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <FeedRecipe
                                name= {recipe.name}
                                email="email"
                                img={recipe.image}
                                description={recipe.description}
                            />
                        </Col>
                        <Col md={4}></Col>
                    </Row>                    
                </ListGroup.Item>
            ))}
        </ListGroup>
        ) : (<h3> Feed is empty </h3>)}
    </Container>
  );
}

export default Feed;
