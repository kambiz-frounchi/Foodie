import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import API from "../utils/API";

/*
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };
*/
function FileUploadTest(props) {
  //const [images, setImages] = useState([]);
  const [formObject, setFormObject] = useState({});

  function fileSelectHandler(images) {
    //setImages(images[0]);
    console.log(images[0]);
    setFormObject({ ...formObject, image: images[0] });
    //formData.append("myimage", formObject.image);
    //for (let p of formData.keys()) {
    //    console.log(p);
    //}
    /*
    API.uploadImage(images[0])
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
    }
    */
  }

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log("value");
    console.log(value);
    setFormObject({ ...formObject, [name]: value });
    //formData.append(name, formObject.name);
    //for (let p of formData.keys()) {
    //    console.log(p);
    //}
  };

  function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData();


    for (const [key, value] of Object.entries(formObject)) {
        console.log(key);
        console.log(value);
        formData.append(key, value);
    }
  
    console.log("uploading ...");
    //return axios.post(`/api/recipes/upload`, formData, config);

//    for (let p of formData.keys()) {
//        console.log(p);
//    }
    
    API.postRecipe(formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Recipe Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="recipe name"
            aria-label="recipe name"
            aria-describedby="basic-addon1"
            onChange={inputChangeHandler}
            name="recipename"
          />
        </InputGroup>
        <FileUpload onChange={fileSelectHandler} />
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default FileUploadTest;
