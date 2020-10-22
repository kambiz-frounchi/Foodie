import React, { useState, useEffect } from "react";
//import LoginSignupForm from "../components/LoginSignupForm";
import { LoginSignupForm } from "../components/LoginSignupForm";

import API from "../utils/API";

function Signup () {
    return <LoginSignupForm signup={true}></LoginSignupForm>
}

export default Signup;