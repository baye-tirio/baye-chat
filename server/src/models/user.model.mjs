import mongoose, { Schema } from 'mongoose'
const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    profilePicture:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFFMaivDh-SlkjODDVaO47EL6Z0QENj2FDw&s',
    },
    fullName:{
        type:String,
        required: true
    }
},{timestamps:true});
const User =  mongoose.model('User',UserSchema);
export default User;