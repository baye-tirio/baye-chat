import Message from "../models/message.model.mjs";
import User from "../models/user.model.mjs";
import { errorHandler } from "../utils/ErrorHandler.mjs";
import { getReceiverSocketId, io } from "../utils/socket.io.mjs";
//record the message sent
export const sendMessage = async (req, res, next) => {
  try {

    console.log("Hit the message sending endpoint");
    console.log(req.body);
    const messageSent = new Message(req.body);
    const newMessage = await messageSent.save();
    //Some socket.io shit comes into play here let's wait and see
    const receiverSocketId = getReceiverSocketId(req.body.receiverId);
    io.to(receiverSocketId).emit('newMessage',newMessage);
    res.status(200).json({
      message: "successfully sent the massage",
      messageDetails: newMessage,
    });
  } catch (error) {
    next(error);
  }
};
//Update a message sent
export const editMessage = async (req, res, next) => {
  try {
    const messageSent = await Message.findById(req.params.id);
    if (messageSent.senderId !== req.tokenPayload.userId)
      next(errorHandler(403, "You can only updates messages you sent!"));
    const { message, multiMedia } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          message,
          multiMedia,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "successfully updated the message",
      messageDetails: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};
//delete message
//Interested to see how received messages are deleted
export const deleteMessage = async (req, res, next) => {
  try {
    const messageSent = await Message.findById(req.params.id);
    if (messageSent.senderId !== req.tokenPayload.userId)
      next(errorHandler(403, "You can only delete messages you sent!"));
    const deleteMessage = await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted the message");
  } catch (error) {
    next(error);
  }
};
//get chats with a particular user/reciever
export const getChat = async (req, res, next) => {
  try {
    const chats = await Message.find({
      $or: [
        {
          senderId: req.tokenPayload.userId,
          receiverId: req.params.receiver_id,
        },
        {
          senderId: req.params.receiver_id,
          receiverId: req.tokenPayload.userId,
        },
      ],
    });
    res.status(200).json({
      message: "successfully retrieved chats",
      chats,
    });
  } catch (error) {
    next(error);
  }
};
//get online users
export const getPlatformUsers = async (req, res, next) => {
  try {
    const onlineUsers = await User.find({
      _id: { $ne: req.tokenPayload.userId },
    });
    res.status(200).json(onlineUsers);
  } catch (error) {
    next(error);
  }
};
