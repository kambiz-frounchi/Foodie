import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginSignupForm } from "../components/LoginSignupForm";
import API from "../utils/API";
import UserContext from "../utils/userContext";

function Login() {
  console.log("Login");
  const history = useHistory();
  const [formObject, setFormObject] = useState({});
  const { loggedInState, setLoggedInState } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formObject);
    API.login(formObject)
      .then((response) => {
        console.log(`login response`);
        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify({ loggedIn: true, email: response.data.user.email }));
        setLoggedInState({ ...loggedInState, loggedIn: true, email: response.data.user.email });
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginSignupForm
      signup={false}
      onClick={handleFormSubmit}
      onChange={handleInputChange}
      onCreateNewUserClick={() => {
        history.push("/signup");
      }}
    />
  );
}

export default Login;
