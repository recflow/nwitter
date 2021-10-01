import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({userObj}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNewits = async()=>{
      // const newits = await dbService.collection("newits").where("creatorId", "==", userObj.uid).get();
      // console.log(newits.docs((doc) => doc.data()));
      const queryMyNewits = query(collection(dbService, "newits"), where("creatorId", "==", userObj.uid), orderBy("createdAt"));
      const querySnapshot = await getDocs(queryMyNewits);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      });
  }
  useEffect(() => {
    getMyNewits();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
