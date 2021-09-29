import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "@firebase/firestore";
import { dbService } from "fbase";
const Home = ({ userObj }) => {
  // console.log(userObj)
  const [neweet, setNeweet] = useState("");
  const [neweets, setNeweets] = useState([]);
  const getNeweets = async () => {
    // const querySnapshot = dbService.collection("neweets").get();
    // console.log(nweets);
    const querySnapshot = await getDocs(collection(dbService, "neweets"));
    querySnapshot.forEach((doc) => {
      const neweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      // console.log(doc.data());});
      setNeweets((prev) => [neweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNeweets();
    // dbService.collection("neweets").onSnapshot(snapshot=>{
    //   console.log("something happened");
    // });
    const collectionQuery = query(collection(dbService, "neweets"), orderBy("createdAt", "desc"));
    onSnapshot(collectionQuery, (snapshot) => {
      const neweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNeweets(neweetsArray)
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // collection("neweets").add({
    //   neweet,
    //   createAt: Date.now()
    // });
    try {
      // const docRef = 
      await addDoc(collection(dbService, "neweets"), {
        text: neweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      // console.log("Document written with ID: ", docRef.id);
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
  // console.log(neweets);
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
            <h4>{neweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
