import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "@firebase/firestore";
import { dbService } from "fbase";
import Newit from "components/Newit";
import NewitFactory from "components/NewitFactory";

const Home = ({ userObj }) => {
  const [newits, setNewits] = useState([]);
  const getnewits = async () => {
    const querySnapshot = await getDocs(collection(dbService, "newits"));
    querySnapshot.forEach((doc) => {
      const newitObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNewits((prev) => [newitObject, ...prev]);
    });
  };
  useEffect(() => {
    getnewits();
    const collectionQuery = query(
      collection(dbService, "newits"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(collectionQuery, (snapshot) => {
      const newitsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewits(newitsArray);
    });
  }, []);
  return (
    <div>
      <NewitFactory userObj={userObj} />
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
