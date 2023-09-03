import React from "react";
import { useEffect, useState } from "react";
import { getMessagesHistoryWithIdRoomChat } from "../Services/RoomChat";

import { useParams } from "react-router-dom";
function ViewChatHistory() {
  const [conversations, setConversations] = useState([]);
  const { roomId } = useParams();
  console.log({ roomId });
  useEffect(() => {
    getMessagesHistoryWithIdRoomChat((res) => {
      console.log(res.data);
      setConversations(res.data);
    }, roomId);
  }, []);

  return (
    <div style={{ margin: "100px 100px" }}>
      {conversations?.map((item) => {
        return (
          <>
            <h6 style={{ color: "gray" }}>{item.sender.email}</h6>
            {item.content.map((content) => {
              if (content.is_file === false) {
                return <p>{content.value}</p>;
              } else {
                return <img width="10%" src={content.value} />;
              }
            })}
          </>
        );
      })}
    </div>
  );
}

export default ViewChatHistory;
