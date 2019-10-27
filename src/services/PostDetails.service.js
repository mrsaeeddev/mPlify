import { API_ROOT_URL } from "../config/config";

export const postDetailsService = {
    fetchCommentsList,
    deletePost,
}

function fetchCommentsList(postId) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch(`${API_ROOT_URL}/comments?postId=${postId}`, requestOptions).then(response =>
      response.json()
    );
  }
  
  function deletePost(postId) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      return fetch(`${API_ROOT_URL}/posts/${postId}`, requestOptions).then(response =>
        response
      );
    }