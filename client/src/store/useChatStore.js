import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((setState, getState) => ({
  chatLoading: false,
  chatError: null,
  chat: [],
  users: [],
  usersLoading: false,
  chatSelectedUser: null,
  usersError: null,
  sendMessageLoading: false,
  sendMessageError: null,
  getUsers: async () => {
    try {
      setState({ usersLoading: true, usersError: null });
      const response = await axiosInstance.get("/message/get-users");
      console.log("The users are :");
      console.log(response.data);
      setState({ users: response.data, usersLoading: false });
    } catch (error) {
      setState({
        usersLoading: false,
        usersError: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  },
  getChat: async (receiver) => {
    try {
      setState({
        chatLoading: true,
        chatError: null,
      });
      const response = await axiosInstance.get(
        `/message/get-chat/${receiver._id}`
      );
      setState({ chatLoading: false, chat: response.data.chats });
    } catch (error) {
      setState({ chatError: error.response.data.message });
      toast.error(error.response.data.message);
    }
  },
  setSelectedUser: (user) => setState({ chatSelectedUser: user }),
  sendMessage: async (MessageData) => {
    try {
      const { chat } = getState();
      console.log("The message data is : ");
      console.log(MessageData);
      setState({ sendMessageLoading: true, sendMessageError: null });
      const response = await axiosInstance.post(
        "/message/send-message",
        MessageData
      );
      console.log("Response from the message sending endpoint");
      console.log(response);
      // toast.success ('successfully sent the message');
      setState({ chat: [...chat, response.data.messageDetails] });
    } catch (error) {
      setState({
        sendMessageError: error.response.data.message,
        sendMessageLoading: false,
      });
      toast.error(error.response.data.message);
    } finally {
      setState({ sendMessageLoading: false });
    }
  },
  subscribeToMessages: () => {
    const { chatSelectedUser } = getState();
    if (!chatSelectedUser) return;
    //This right here illegal because react hooks can only be called inside the body of a functional component
    // const { socket } = useAuthStore();
    // The fix now becomes
    const socket = useAuthStore.getState().socket;
    // to be optimized
    socket.on("newMessage", (newMessage) => {
      //let's optimize this shit
      if (newMessage.senderId === getState().chatSelectedUser._id) {
        setState({ chat: [...getState().chat, newMessage] });
      }
      console.log(newMessage);
    });
  },
  //basically let's not try to listen to the new message event/notification
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
