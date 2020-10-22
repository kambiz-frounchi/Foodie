import React, { useState, useEffect } from "react";
import { LoginSignupForm } from "../components/LoginSignupForm";
import API from "../utils/API";

function Login () {
    console.log("Login");
    return <LoginSignupForm signup={false}></LoginSignupForm>
}

export default Login;