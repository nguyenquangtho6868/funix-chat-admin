import { API_URL } from "../Constant/ApiConstant";

export function loginPage(callback, data) {
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(callback);
}

export function addUser(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/add-user`, {
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
export function addListUser(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/add-listuser`, {
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

export function editUser(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/edit-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(callback);
}

export function getUserDetail(callback, id) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-user-detail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(callback);
}

export function deleteUser(callback, id) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/delete-user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(callback);
}

export function getUsers(callback) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-list-user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(callback);
}
