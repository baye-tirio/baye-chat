import axios from "axios";
export const axiosInstance = axios.create({
  //equivalent to the way we create proxies when we use fetch
  //I think apo instead of MODE it should be PROJECT_ENVIRONMENT not sure tho we gon see.
  baseURL:
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_SERVER_DEVELOPMENT_URL}/api`
      : `/`,
  //basically send cookies with each and every request

  withCredentials: true,
});
