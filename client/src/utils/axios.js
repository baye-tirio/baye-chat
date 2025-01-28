import axios from "axios";
export const axiosInstance = axios.create({
  //equivalent to the way we create proxies when we use fetch
  //I think apo instead of MODE it should be PROJECT_ENVIRONMENT not sure tho we gon see.
  baseURL: "https://baye-chat.onrender.com",
  // baseURL: "http://localhost:5700",
  //basically send cookies with each and every request

  withCredentials: true,
});
