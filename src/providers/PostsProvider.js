import React, { useEffect, useState, useRef, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndData } from './../utils/misc';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const unsubscribeFromFirestore = useRef(null);


  useEffect(() => {
    unsubscribeFromFirestore.current = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const p = snapshot.docs.map(collectIdsAndData);
        setPosts(p);
      });

    return unsubscribeFromFirestore.current;
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
