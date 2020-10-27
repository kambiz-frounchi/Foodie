import React, {useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../utils/userContext";
import API from "../../utils/API";

function Wrapper(props) {
    const {loggedInState, setLoggedInState} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        API.getUser()
          .then((response) => {
            console.log("user");
            console.log(response.data);
            if (response.data.user.id != 0) {
              setLoggedInState({ loggedIn: true, email: response.data.user.email });
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
      }, []);

  return <main className="wrapper" {...props} />;
}

export default Wrapper;
