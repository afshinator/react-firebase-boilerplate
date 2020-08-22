import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { firestore, auth } from "./firebase";
import { collectIdsAndDocs } from './utils/misc';
import Posts from "./components/Posts";
import Authentication from "./components/Authentication";

function App() {
  const [posts, setPosts] = React.useState([])
  const [user, setUser] = React.useState(null)
  const unsubscribeFromFirestore = React.useRef(null)
  const unsubscribeFromAuth = React.useRef(null)

  // const handleCreate = post => {
  //   firestore.collection('posts').add(post)
  // };

  // const handleRemove =  id => {
  //   firestore.doc(`posts/${id}`).delete()
  // }

  React.useEffect(() => {
    // firestore
    //   .collection("posts")
    //   .get()
    //   .then((snapshot) => {
    //     const p = snapshot.docs.map(collectIdsAndDocs);
    //     setPosts(p)

    //   });
    unsubscribeFromFirestore.current = firestore.collection('posts')
      .onSnapshot(snapshot => {
        const p = snapshot.docs.map(collectIdsAndDocs);
        setPosts(p)
      })
    
    return unsubscribeFromFirestore.current
  }, []);

  useEffect(()=>{
    unsubscribeFromAuth.current = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubscribeFromAuth.current
  }, [])

  console.log(posts)
  return (
    <div className="Application">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Authentication user={user} />
      <Posts posts={posts} />
    </div>
  );
}

export default App;
