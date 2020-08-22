import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { firestore } from "./firebase";
import { collectIdsAndDocs } from './utils/misc';
import Posts from "./components/Posts";
import Authentication from "./components/Authentication";

function App() {
  const [posts, setPosts] = React.useState([])
  const [user, setUser] = React.useState(null)
  const unsubscribe = React.useRef(null)

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
    unsubscribe.current = firestore.collection('posts')
      .onSnapshot(snapshot => {
        const p = snapshot.docs.map(collectIdsAndDocs);
        setPosts(p)
      })
    
    return unsubscribe.current
  }, []);

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
