import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginSignupForm } from "../components/LoginSignupForm";
import API from "../utils/API";

function Signup () {
    const history = useHistory();
    const [formObject, setFormObject] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //console.log(formObject);
        API.signup(formObject)
        .then(() => history.push("/login"))
        .catch(err => console.log(err));
    }

    return <LoginSignupForm
                signup={true}
                onClick={handleFormSubmit}
                onChange={handleInputChange}
            />
}

export default Signup;