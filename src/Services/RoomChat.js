import { API_URL } from "../Constant/ApiConstant";
export function getRoomChats(callback, data) {
  //const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-all-room-chat`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
  })
    .then((res) => res.json())
    .then(callback);
}
export function getMessagesHistoryWithIdRoomChat(callback, roomId) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-message-history-room-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roomId }),
  })
    .then((res) => res.json())
    .then(callback);
}
