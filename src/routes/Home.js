import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "@firebase/firestore";
import { dbService } from "fbase";
import Newit from "components/Newit";
const Home = ({ userObj }) => {
  // console.log(userObj)
  const [newit, setNewit] = useState("");
  const [newits, setNewits] = useState([]);
  const getnewits = async () => {
    // const querySnapshot = dbService.collection("newits").get();
    // console.log(newits);
    const querySnapshot = await getDocs(collection(dbService, "newits"));
    querySnapshot.forEach((doc) => {
      const newitObject = {
        ...doc.data(),
        id: doc.id,
      };
      // console.log(doc.data());});
      setNewits((prev) => [newitObject, ...prev]);
    });
  };
  useEffect(() => {
    getnewits();
    // dbService.collection("newits").onSnapshot(snapshot=>{
    //   console.log("something happened");
    // });
    const collectionQuery = query(collection(dbService, "newits"), orderBy("createdAt", "desc"));
    onSnapshot(collectionQuery, (snapshot) => {
      const newitsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewits(newitsArray)
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // collection("newits").add({
    //   newit,
    //   createAt: Date.now()
    // });
    try {
      // const docRef = 
      await addDoc(collection(dbService, "newits"), {
        text: newit,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNewit("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewit(value);
  };
  // console.log(newits);
  const onFileChange = (event) =>{
    // console.log(event.target.files)
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // console.log(theFile)
    const reader =new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={newit}
          onChange={onChange}
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={140}
        />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="newit" />
      </form>
      <div>
        {newits.map((newit) => (
          <Newit
            key={newit.id}
            newitObj={newit}
            isOwner={newit.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
