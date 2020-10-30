import React, { useState, useEffect, useContext } from "react";
import { Button, Card } from "react-bootstrap";

function FeedRecipe(props) {
    return (<div>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="" alt="recipe image" />
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.email}</Card.Subtitle>
            <Card.Text>
                {props.description}
            </Card.Text>
            <Button variant="primary">Like</Button>
        </Card.Body>
        </Card>            
    </div>);
}

export default FeedRecipe;