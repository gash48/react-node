import { GET, POST } from "../services/axios";

export const FetchUsersCount = () => GET("/users-count").then(res => res.totalUsers);

export const CreateUser = email => POST("/user", { email }).then(res => res.totalUsers);
