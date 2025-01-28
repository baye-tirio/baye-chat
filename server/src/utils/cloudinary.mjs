//basically configuring cloudinary so that we can be able to use it when uploading and downloading images
import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_KEY_SECRET
})
export default cloudinary;