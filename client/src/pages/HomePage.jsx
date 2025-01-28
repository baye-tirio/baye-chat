import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";
import SideBar from "../Components/SideBar";
import { useChatStore } from "../store/useChatStore";

export default function HomePage() {
  const { chatSelectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {chatSelectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
}
