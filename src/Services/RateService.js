import { API_URL } from "../Constant/ApiConstant";
export function getMenterRate(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-mentor-detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(callback);
}
