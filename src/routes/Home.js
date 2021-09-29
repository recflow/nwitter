import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { dbService } from "fbase";
const Home = () => {
  const [neweet, setNeweet] = useState("");
  const [neweets, setNeweets] = useState([]);
  const getNeweets =async()=>{
    // const querySnapshot = dbService.collection("neweets").get();
    // console.log(nweets);
    const querySnapshot = await getDocs(collection(dbService, "neweets"));
    querySnapshot.forEach((doc) => {
      const neweetObject = {
        ...doc.data(),
        id: doc.id,
      }
      // console.log(doc.data());});
      setNeweets(prev => [neweetObject, ...prev]);
    });
  }
  useEffect(() => {
    getNeweets();
  }, []);
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
  console.log(neweets);
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
      <div>
        {neweets.map((neweet) => (
          <div key={neweet.id}>
            <h4>{neweet.neweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
