import {
  GET,
  POST,
  POST_FORM,
  UPDATE_FORM,
  GET_FILE,
  throwError,
  DELETE,
  PUT,
  addAuthHeaders,
  removeAuthHeaders
} from "../services/axios";

export const Login = data =>
  POST("/auth/login", data)
    .then(data => {
      const { token, ...rest } = data;
      addAuthHeaders(token);
      return { isLoggedIn: true, user: rest };
    })
    .catch(throwError);

export const Logout = () =>
  DELETE("/auth/logout")
    .then(res => {
      removeAuthHeaders();
      return res;
    })
    .catch(throwError);

export const Signup = data => POST("/auth/signup", data).catch(throwError);

export const FetchProfile = () => GET("/auth/profile").catch(throwError);

export const FetchPosts = page => GET("/feed/posts", { page }).catch(throwError);

export const CreatePost = data => POST_FORM("/feed/post", data).catch(throwError);

export const UpdatePost = data => UPDATE_FORM("/feed/post", data).catch(throwError);

export const FetchPost = postId => GET(`/feed/post/${postId}`).catch(throwError);

export const RemovePost = id => DELETE(`/feed/post/${id}`).catch(throwError);
