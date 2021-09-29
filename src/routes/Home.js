import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "fbase";
const Home = () => {
  const [neweet, setNeweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    // collection("neweets").add({
    //   neweet,
    //   createAt: Date.now()
    // });
    try {
      const docRef = await addDoc(collection(dbService, "neweets"), {
        neweet,
        createAt: Date.now()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNeweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNeweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={neweet}
          onChange={onChange}
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={140}
        />
        <input type="submit" value="NEWeet" />
      </form>
    </div>
  );
};
export default Home;
