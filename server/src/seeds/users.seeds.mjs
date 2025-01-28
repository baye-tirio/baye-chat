import mongoose from "mongoose";
import User from "../models/user.model.mjs";
import { connect_db } from "../utils/db.mjs";
const userSeeds = [
    // Female Users
    {
      username:'emmathompson',
      email: "emma.thompson@example.com",
      fullName: "Emma Thompson",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      username:'oliviamiller',
      email: "olivia.miller@example.com",
      fullName: "Olivia Miller",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      username:'sophiadavis',
      email: "sophia.davis@example.com",
      fullName: "Sophia Davis",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      username:'avawilson',
      email: "ava.wilson@example.com",
      fullName: "Ava Wilson",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      username:'isabellabrown',
      email: "isabella.brown@example.com",
      fullName: "Isabella Brown",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      username:'miajohnson',
      email: "mia.johnson@example.com",
      fullName: "Mia Johnson",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      username:'charlottewilliams',
      email: "charlotte.williams@example.com",
      fullName: "Charlotte Williams",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      username:'ameliagarcia',
      email: "amelia.garcia@example.com",
      fullName: "Amelia Garcia",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  
    // Male Users
    {
      username:'jamesanderson',
      email: "james.anderson@example.com",
      fullName: "James Anderson",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      username:'williamclark',
      email: "william.clark@example.com",
      fullName: "William Clark",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      username:'benjamintaylor',
      email: "benjamin.taylor@example.com",
      fullName: "Benjamin Taylor",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      username:'lucasmoore',
      email: "lucas.moore@example.com",
      fullName: "Lucas Moore",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      username:'henryjackson',
      email: "henry.jackson@example.com",
      fullName: "Henry Jackson",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      username:'alexandermartin',
      email: "alexander.martin@example.com",
      fullName: "Alexander Martin",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      username:'danielrodriguez',
      email: "daniel.rodriguez@example.com",
      fullName: "Daniel Rodriguez",
      password: "123456",
      profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];
const seedUsers = async () => {
  try {
    //connect_db();
    mongoose.connect('mongodb://127.0.0.1:27017/baye_chat_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12');
    await User.insertMany(userSeeds)
    console.log('successfully seeded the database');
  } catch (error) {
    console.log(error.message);
  }
}
seedUsers();