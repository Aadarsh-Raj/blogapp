import { createContext, useContext, useEffect, useState } from "react";

const UserContextController = createContext({});

export const UserFunction = () => {
  return useContext(UserContextController);
};
const UserContext = ({ children }) => {
  const functionObject = {};

  return (
    <UserContextController.Provider value={functionObject}>
      {children}
    </UserContextController.Provider>
  );
};

export { UserContext };
