import React from "react";

const UserContext = React.createContext({
  loggedInState: {},
  setLoggedInState: () => {},
  handleLoginLogout: () => {}
});

export default UserContext;