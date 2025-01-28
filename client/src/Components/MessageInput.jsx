import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [multiMediaPreview, setMultimediaPreview] = useState(null);
  //This refers to the input tag which we would use to get our image(multimedia in general)
  const fileInputRef = useRef(null);
  const { sendMessage, chatSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  // The logic to get the image (multimedia) from the computer
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    //another check but this if for now since we are only uploading images and not any other kind of multimedia
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMultimediaPreview(reader.result);
    };
  };
  //In case tumeghairi kutuma the image (multimedia)
  const removeImage = () => {
    setMultimediaPreview(null);
    //So I think the component refers itself as it gets rendered
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
  //Sending the message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      //don't see the relevance of this part since the submit button is disabled when we have neither a message nor a multimedia preview but we gon keep it to stay on the safe side
      if (!text.trim() && !multiMediaPreview) {
        toast.error("Can't send an empty message");
        return;
      }
      const messageData = {
        message: text,
        senderId: authUser._id,
        receiverId: chatSelectedUser._id,
        multiMedia: multiMediaPreview,
      };
      //   toast.success(JSON.stringify(messageData));
      await sendMessage(messageData);
      //clearing the form
      setText("");
      setMultimediaPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.log("failed to send the message", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Only rendered if we have an image selected to be sent */}
      {multiMediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={multiMediaPreview}
              alt="multimedia-preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                        ${
                          multiMediaPreview
                            ? "text-emerald-500"
                            : "text-zinc-400"
                        }
                        `}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          className="btn btn-sm btn-circle"
          type="submit"
          disabled={!text.trim() && !multiMediaPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
