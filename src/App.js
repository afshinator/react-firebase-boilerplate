import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { firestore } from "./firebase";
import { collectIdsAndDocs } from './utils/misc';
import Posts from "./components/Posts";

function App() {
  const [posts, setPosts] = React.useState([])

  const handleCreate = async post => {
    const docRef = await firestore.collection('posts').add(post)
    const doc = await docRef.get()
    const newPost = collectIdsAndDocs(doc)
  
    setPosts([newPost, ...posts]);
  };

  const handleRemove = async id => {
    const allPosts = posts;
    await firestore.doc(`posts/${id}`).delete()
    const p = allPosts.filter(po => po.id !== id)
    setPosts(p)
  }

  React.useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then((snapshot) => {
        const p = snapshot.docs.map(collectIdsAndDocs);
        setPosts(p)

      });
  }, []);

  console.log(posts)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Posts posts={posts} onCreate={handleCreate} onRemove={handleRemove}/>
    </div>
  );
}

export default App;
