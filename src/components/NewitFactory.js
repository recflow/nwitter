import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { collection, addDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NewitFactory = ({userObj}) => {
    const [newit, setNewit] = useState("");
    const [attachment, setAttachment] = useState(""); //5.0 파일 업로드를 하지 않고 텍스트만 업로드 할 때 에러나지 않도록 수정
  
    const onSubmit = async (event) => {
        if (newit === "") {
            return;
          }
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
    
      const onClearAttachment = () => setAttachment("");
      
    return (
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={newit}
            onChange={onChange}
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            maxLength={140}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />

        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
              alt="profile"
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>업로드 취소</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    );
}
export default NewitFactory;