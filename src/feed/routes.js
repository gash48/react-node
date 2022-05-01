import Home from "./home";
import Feed from "./feed";
import Login from "./login";
import Signup from "./signup";
import AddEditPost from "./add-edit-post";
import ViewPost from "./view-post";

import { Logout } from "./actions";

export const unAuthNavOptions = {
  feeds: {
    key: "feeds",
    name: "Feeds",
    route: "/feeds",
    component: Feed
  },
  login: {
    key: "login",
    name: "Login",
    component: Login,
    position: "right"
  },
  signup: {
    key: "signup",
    name: "Signup",
    component: Signup
  },
  "/": {
    key: "/",
    name: "Home",
    component: Home,
    hide: true
  }
};

export const authNavOptions = {
  viewPost: {
    key: "viewPost",
    route: "/post/:postId",
    name: "View Post",
    component: ViewPost,
    hide: true
  },
  addPost: {
    key: "addPost",
    name: "Add Post",
    component: AddEditPost
  },
  editPost: {
    key: "editProduct",
    name: "Edit Product",
    route: "/editPost/:postId",
    component: AddEditPost,
    hide: true
  },
  feeds: {
    key: "feeds",
    name: "Feeds",
    route: "/feeds",
    component: Feed
  },
  logout: {
    key: "logout",
    name: "Logout",
    onClick: onSuccess => Logout().then(onSuccess),
    position: "right"
  },
  "/": {
    key: "/",
    name: "Home",
    component: Home,
    hide: true
  }
};
