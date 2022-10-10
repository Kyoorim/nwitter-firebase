import React, { useState } from "react";
import { dbService } from "../config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "../config";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, "ntweets", `${nweetObj.id}`);

  //삭제하기
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet ?");
    console.log(ok);
    if (ok) {
      //delete nweet
      await deleteDoc(NweetTextRef);
      const desertRef = ref(storageService, nweetObj.attachmentUrl);
      await deleteObject(desertRef);
    }
  };

  // 업데이트 하기
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(nweetObj, newNweet);
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              alt="profile_photo"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete nweet</button>
              <button onClick={toggleEditing}>Edit nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
