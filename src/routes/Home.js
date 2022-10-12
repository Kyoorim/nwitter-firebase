import React, { useEffect, useState } from "react";
import { dbService } from "../config";
// import { collection, addDoc, getDocs } from "firebase/firestore";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from "../components/Nweet";

import NweetForm from "../components/NweetForm";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

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

  // console.log(nweets);
  return (
    <div className="container">
      <NweetForm userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
    </div>
  );
};

export default Home;
