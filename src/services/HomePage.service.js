import { API_ROOT_URL } from "../config/config";

export const homePageService = {
  fetchUsersList,
}

function fetchUsersList() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${API_ROOT_URL}/users`, requestOptions).then(response =>
    response.json()
  );
}
