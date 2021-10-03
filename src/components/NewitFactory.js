import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { collection, addDoc } from "@firebase/firestore";
const NewitFactory = ({userObj}) => {
    const [newit, setNewit] = useState("");
    const [attachment, setAttachment] = useState(""); //5.0 파일 업로드를 하지 않고 텍스트만 업로드 할 때 에러나지 않도록 수정
  
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment !== "") {
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const uploadFile = await uploadString(
            attachmentRef,
            attachment,
            "data_url"
          );
          attachmentURL = await getDownloadURL(uploadFile.ref);
        }
        const newitObj = {
          text: newit,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentURL,
        };
    
        await addDoc(collection(dbService, "newits"), newitObj);
        setNewit("");
        setAttachment("");
      };
      const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewit(value);
      };
      const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
    
      const onClearAttachmentClick = () => setAttachment(null);
      
    return (
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
            <img src={attachment} width="50px" height="50px" alt="profile" />
            <button onClick={onClearAttachmentClick}>업로드 취소</button>
          </div>
        )}
      </form>
    )
}
export default NewitFactory;