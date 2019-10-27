import { API_ROOT_URL } from "../config/config";

export const userDetailsService = {
    fetchPostsList,
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
  