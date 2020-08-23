import React, { useEffect, useState, useRef, createContext } from "react";
import { firestore, auth, createUserProfileDocument } from "../firebase";
import { collectIdsAndDocs } from "../utils/misc";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      console.log("App.js auth state changed.", user);
      setUser(user);
    });
    return unsubscribeFromAuth.current;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider

