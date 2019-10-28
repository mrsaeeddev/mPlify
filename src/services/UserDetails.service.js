import { API_ROOT_URL } from "../config/config";

export const userDetailsService = {
  fetchPostsList,
  addPost
}

function fetchPostsList(userId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${API_ROOT_URL}/posts?userId=${userId}`, requestOptions).then(response =>
    response.json()
  );
}

function addPost(userId, post) {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  };
  return fetch(`${API_ROOT_URL}/posts?userId=${userId}`, requestOptions).then(response =>
    response
  );
}