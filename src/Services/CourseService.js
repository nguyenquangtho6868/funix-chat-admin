import { API_URL } from "../Constant/ApiConstant";

export function addCourse(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/add-course`, {
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

export function editCourse(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/edit-course`, {
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

export function getCourseDetail(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-list-course-detail`, {
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

export function deleteCourse(callback, id) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/delete-course`, {
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

export function getCourses(callback) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/get-list-course`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(callback);
}
