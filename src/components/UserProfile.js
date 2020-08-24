import React, { useContext, useState, useRef } from "react";
import { auth, firestore } from "../firebase";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const imageInput = useRef(null);

  const uid = auth.currentUser.uid;
  const userRef = firestore.doc(`users/${uid}`);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDisplayName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (displayName) {
      userRef.update({ displayName });
    }
  };

  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          placeholder="Display name"
        />
        <input type="file" ref={ref => imageInput.current = ref} />
        <input className="update" type="submit"  />
      </form>
    </section>
  );
};

export default UserProfile;
