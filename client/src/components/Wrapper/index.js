import React, {useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../utils/userContext";
import API from "../../utils/API";

function Wrapper(props) {
    const {loggedInState, setLoggedInState} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(`User Info: ${userInfo}`);
      if(!userInfo) {
        API.getUser()
          .then((response) => {
            console.log("user");
            console.log(response.data);
            if (response.data.user.id != 0) {
              setLoggedInState({ loggedIn: true, email: response.data.user.email });
              localStorage.setItem("userInfo", JSON.stringify({ loggedIn: true, email: response.data.user.email }));
              history.push("/");
            }
            else {
                setLoggedInState({ ...loggedInState, loggedIn: false });
                history.push("/login");
            }
          })
          .catch((err) => {
            console.log("err");
            console.log(err);
            setLoggedInState({ ...loggedInState, loggedIn: false });
            history.push("/login");
          });
        }
        else {
          setLoggedInState(userInfo);
        }
      }, []);

  return <main className="wrapper" {...props} />;
}

export default Wrapper;
