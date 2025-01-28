//so we named this module useAuthStore because it is basically utilized as a hook that returns the state and it's reducers in the global store managed by zustand
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "/";
export const useAuthStore = create((setState, getState) => ({
  authUser: null,
  authloading: false,
  authError: null,
  signUpLoading: false,
  signUpError: false,
  logInLoading: false,
  logInError: false,
  logInSuccess: false,
  logOutLoading: false,
  logOutError: false,
  logOutSuccess: false,
  updateProfileLoading: false,
  updateProfileError: null,
  onlineUsers: [],
  googleLoading: false,
  googleError: null,
  socket: null,

  checkAuth: async () => {
    try {
      setState({ authloading: true });
      const res = await axiosInstance.get("/user/checkAuth");
      console.log("The authenticated user is : ");
      console.log(res.data);
      setState({ authloading: false, authUser: [] });
      getState().connectSocket();
    } catch (error) {
      setState({ authloading: false });
      setState({ authError: error.message });
    }
  },
  signUp: async (data) => {
    try {
      setState({ signUpLoading: true });
      setState({ signUpError: false });
      const response = await axiosInstance.post(
        "/authentication/sign-up",
        data
      );
      toast.success("Account created successfully");
      setState({ authUser: response.data.userDetails, signUpLoading: false });
      getState().connectSocket();
      console.log(response);
    } catch (error) {
      setState({ signUpLoading: false });
      setState({ signUpError: error.message });
      toast.error(error.response.data.message);
    }
  },
  logOut: async () => {
    try {
      setState({ logOutLoading: true, logOutError: null });
      const response = await axiosInstance.get("/authentication/log-out");
      console.log(response);
      setState({ logOutLoading: false, authUser: null });
      getState().disconnectSocket();
      toast.success("logout successfull");
    } catch (error) {
      // setState({ logOutError: error.response.data.message });
      console.log(error);
      setState({ logOutLoading: false });
      // toast.error(error.response.data.message);
    }
  },
  logIn: async (data) => {
    try {
      setState({ logInLoading: true });
      setState({ logInError: null });
      //will come and comment this one out later just trying out something.
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axiosInstance.post("/authentication/log-in", data);
      console.log(response);
      setState({ authUser: response.data.userDetails, logInLoading: false });
      getState().connectSocket();
      toast.success("Successfull log in");
    } catch (error) {
      setState({ logInLoading: false });
      setState({ logInSuccess: false });
      setState({ logInError: error.response.data.message });
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (data) => {
    setState({ updateProfileLoading: true, updateProfileError: null });
    try {
      console.log("The form data as seen in the updateProfile reducer is:");
      console.log(data);
      const response = await axiosInstance.post(
        `/user/update/${data.id}`,
        data
      );
      toast.success("Profile updated successfully");
      setState({
        updateProfileLoading: false,
        authUser: response.data.updatedUser,
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setState({
        updateProfileLoading: false,
        updateProfileError: error.response.data.message,
      });
    }
  },
  connectSocket: () => {
    try {
      const { authUser } = getState();
      if (!authUser || getState().socket?.connected) return;
      console.log("Trying to connect to the socket server");
      const socket = io(BASE_URL, {
        query: {
          userId: getState().authUser._id,
        },
      });
      socket.connect();
      setState({ socket: socket });
      socket.on("onlineUsers", (onlineUsersIds) => {
        console.log("Them online users from the connect socket function are: ");
        console.log(onlineUsersIds);
        setState({ onlineUsers: onlineUsersIds });
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  disconnectSocket: () => {
    if (getState().socket?.connected) getState().socket.disconnect();
    socket.on("onlineUsers", (onlineUsersIds) => {
      setState({ onlineUsers: onlineUsersIds });
    });
  },
  continueGoogle: async () => {
    try {
      setState({ googleLoading: true, googleError: null });
      const response = await axiosInstance.get("/authentication/google");
      setState({ authUser: response.data.userDetails, googleLoading: false });
      toast.success("successfull continue with google");
    } catch (error) {
      setState({
        googleLoading: false,
        googleError: error.response
          ? error.response.data.message
          : error.message,
      });
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  },
}));
