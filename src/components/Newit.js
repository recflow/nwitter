import React from 'react'

const Newit = ({newitObj,isOwner}) => {
    return (
      <div>
        <h4>{newitObj.text}</h4>
        {isOwner && (
          <>
            <button>Delete Newit</button>
            <button>Edit Newit</button>
          </>
        )}
      </div>
    );
}

export default Newit;