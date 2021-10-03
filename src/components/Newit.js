import { deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { deleteObject,ref } from '@firebase/storage';
import { dbService, storageService } from 'fbase'
import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Newit = ({newitObj,isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNewit, setNewNewit] = useState(newitObj.text);
    const onDeleteClick = async () =>{
        const ok = window.confirm("진짜로 이 newit을 삭제하시겠습니까?")
        if(ok){
            // await dbService.doc(`gnweets/${nweetObj.id}`).delete();
            await deleteDoc(doc(dbService,`newits/${newitObj.id}`))
            await deleteObject(ref(storageService, newitObj.attachmentURL));
        }

    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log(newitObj, newNewit);
        await updateDoc(doc(dbService, `newits/${newitObj.id}`),{text: newNewit,})
        setEditing(false);
    }
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewNewit(value);
    }
    return (
      <div className="nweet">
        {editing ? (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                type="text"
                placeholder="Edit your newit"
                value={newNewit}
                required
                autoFocus
                onChange={onChange}
                className="formInput"
              />
              <input type="submit" value="수정" className="formBtn" />
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </span>
          </>
        ) : (
          <>
            <h4>{newitObj.text}</h4>
            {newitObj.attachmentURL && <img src={newitObj.attachmentURL} alt="profile" />}
            {isOwner && (
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
}

export default Newit;