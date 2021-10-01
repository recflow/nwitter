import { deleteDoc, doc, updateDoc } from '@firebase/firestore'
import { dbService } from 'fbase'
import React, {useState} from 'react'

const Newit = ({newitObj,isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNewit, setNewNewit] = useState(newitObj.text);
    const onDeleteClick = async () =>{
        const ok = window.confirm("진짜로 이 newit을 삭제하시겠습니까?")
        if(ok){
            // await dbService.doc(`gnweets/${nweetObj.id}`).delete();
            await deleteDoc(doc(dbService,`newits/${newitObj.id}`))
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
      <div>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your newit"
                value={newNewit}
                required
                onChange={onChange}
              />
              <input type="submit" value="수정"/>
            </form>
            <button onClick={toggleEditing}>취소</button>
          </>
        ) : (
          <>
            <h4>{newitObj.text}</h4>
            {newitObj.attachmentURL && <img src={newitObj.attachmentURL} width="50px" height="50px" alt="profile"/>}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={toggleEditing}>수정</button>
              </>
            )}
          </>
        )}
      </div>
    );
}

export default Newit;