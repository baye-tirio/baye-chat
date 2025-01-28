import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../utils/formatTime";
// import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    chat,
    getChat,
    chatLoading,
    chatSelectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getChat(chatSelectedUser);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [chatSelectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && chat) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  // console.log("Them chats are:");
  // console.log(chat);
//When we loading the chat this is what we would render
  if (chatLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((c) => (
          <div
            key={c._id}
            className={`chat ${c.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    c.senderId === authUser._id
                      ? authUser.profilePicture
                      : chatSelectedUser.profilePicture
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {/* {formatMessageTime(c.createdAt)} */}
                {formatMessageTime(c.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {c.multiMedia && (
                <img
                  src={c.multiMedia}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 self-center"
                />
              )}
              {c.message && <p>{c.message}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;