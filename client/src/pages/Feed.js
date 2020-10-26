import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";

function Feed() {
  const [loggedInState, setLoggedInState] = useState({loggedIn: false, email: ""});
  const history = useHistory();

  useEffect(() => {
    API.getUser()
      .then((response) => {
        console.log("user");
        console.log(response.data);
        setLoggedInState({ loggedIn: true, email: response.data.user.email });})
      .catch((err) => {
          console.log(err);
          setLoggedInState({ loggedIn: false, ...loggedInState });
          history.push("/login");
      });
  }, []);

  return (
    <div>
      <span>Feed Page!</span>
    </div>
  );
}

export default Feed;
