import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "@firebase/firestore";
import { dbService, storageService } from "fbase";
import Newit from "components/Newit";
import { v4 as uuidv4 } from 'uuid';
import { uploadString,ref,getDownloadURL } from "@firebase/storage";

const Home = ({ userObj }) => {
  // console.log(userObj)
  const [newit, setNewit] = useState("");
  const [newits, setNewits] = useState([]);
  const [attachment, setAttachment] = useState(""); //5.0 파일 업로드를 하지 않고 텍스트만 업로드 할 때 에러나지 않도록 수정
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
    // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    // const response = await fileRef.putString(attachment, "data_url");
    let attachmentURL="";
    if(attachment !== ""){
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(uploadFile.ref);
    }
      const newitPosting = {
        text: newit,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentURL,
      };
    

    await addDoc(collection(dbService, "newits"), newitPosting);
    setNewit("");
    setAttachment("");
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
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    
  }

  const onClearAttachmentClick = () => setAttachment(null);
  console.log(userObj)
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="newit" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="profile"/>
            <button onClick={onClearAttachmentClick}>업로드 취소</button>
          </div>
        )}
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
