import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import RecipeContent from "../components/Recipe"
import {useLocation} from "react-router-dom" 

function Recipe (props) {
    const [recipe, setRecipe] = useState([]);
    const { loggedInState } = useContext(UserContext);

    const recipeUrl = useLocation()
        console.log(recipeUrl)

    useEffect(() => {
        loadRecipe();
    }, []);

    function loadRecipe() {
        API.getRecipe(recipeUrl.split("/")[1])
          .then((res) => {
            setRecipe(res.data);
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
                        nickname= {loggedInState.nickname}
                        img={recipe.image}
                        description={recipe.description}
                        ingredients={recipe.ingredients}
                        tags={recipe.tags}
                        difficulty={recipe.difficulty}
                        time={recipe.time}
                        category={recipe.category}
                        />
                    </Col>
                  </Row>
                </ListGroup.Item>
            </ListGroup>
        </Container>
      );
    }
export default Recipe;