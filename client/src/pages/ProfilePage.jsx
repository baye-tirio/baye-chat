import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, Tag, User } from "lucide-react";

export default function ProfilePage() {
  const { authUser, updateProfileLoading, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({ id: authUser._id });

  //reading the image from the computer .. this is important and imo have to come back and understand its nuances
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      console.log(base64Image);
      setFormData({ ...formData, profilePicture: base64Image });
    };
  };
  console.log(formData.profilePicture);
  return (
    <div className="h-full pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.profilePicture || authUser.profilePicture}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                absolute bottom-0 right-0 
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${
                  updateProfileLoading
                    ? "animate-pulse pointer-events-none"
                    : ""
                }
              `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={updateProfileLoading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {updateProfileLoading
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          {/* User Details Inputs */}
          <div className="space-y-6">
            {/* username */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <input
                type="text"
                defaultValue={authUser?.username}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </div>
            {/* full name */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                defaultValue={authUser?.fullName}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
              />
            </div>
            {/* email address */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <input
                type="text"
                defaultValue={authUser?.email}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
          </div>
          {/* Extra miscellaneous section  */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={() => {
                updateProfile(formData);
              }}
              className="px-4 py-2.5 bg-base-200 rounded-lg border uppercase w-full"
              disabled={updateProfileLoading}
            >
              {updateProfileLoading ? "Updating..." : "update profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
