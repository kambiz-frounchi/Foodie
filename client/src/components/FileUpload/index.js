import React from "react";
//import { Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
//import API from "../../utils/API";

function FileUpload(props) {

  return (
    <ImageUploader
      withIcon={true}
      label="Max file size: 10MB, accepted: jpg | jpeg | gif | png"
      buttonText="Choose images"
      onChange={props.onChange}
      imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
      maxFileSize={10485760}
      singleImage={true}
    />
  );
}

export default FileUpload;

  /*
  function fileSelectHandler(event) {
    event.preventDefault();
    console.log(event.target.files[0]);
    const image = event.target.files[0];

    setImage(image);
    API.uploadImage(image)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  */
 
   /*
      <Form>
          <Form.Group>
            <Form.File id="imageFile" label="Select File" onChange={fileSelectHandler}/>
          </Form.Group>
      </Form>
      */