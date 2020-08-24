import React, { useEffect, useState, useRef, createContext } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      let userRef
      if (userAuth) {
        userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapshot => {
          setUser({uid: snapshot.id, ...snapshot.data()})
        })
      }

      console.log("App.js auth state changed.", user);
      // setUser(userAuth);
    });
    return unsubscribeFromAuth.current;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default UserProvider;
