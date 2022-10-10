import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../config";
// import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Nweet from "../components/Nweet";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  // 1. 데이터 가져오는 "옛날 방식"
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "ntweets"));
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };

  // 2. 데이터 가져오는 요즘 방식 : 렌더링을 한 번만 하기 때문에 실행이 빠름
  useEffect(() => {
    const q = query(
      collection(dbService, "ntweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(nweetArr);
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    // 사진 추가하기
    if (attachment) {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
      // console.log(attachmentUrl);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, "ntweets"), nweetObj);
    setNweet("");
    setAttachment("");
  };

  // 트윗 추가하기
  // await addDoc(collection(dbService, "ntweets"), {
  //   text: nweet,
  //   createdAt: Date.now(),
  //   creatorId: userObj.uid,
  // });
  // setNweet("");
  // };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files); // file list를 보여줌
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent)
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachement = () => {
    setAttachment(null);
  };
  // console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
        ></input>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Ntweet"></input>
        {attachment && (
          <div>
            <img src={attachment} alt="thumnail" width="50px" height="50px" />
            <button onClick={onClearAttachement}> Clear </button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          // <div key={nweet.id}>
          //   <h4>{nweet.text}</h4>
          // </div>
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
