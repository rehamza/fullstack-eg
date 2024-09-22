"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/contexts/userContext";
import { useProfile } from "@/apis/hooke/useUser";
import Loader from "@/components/Loader";

export default function MainProfile() {
  const { logout } = useUser();
  const { profile, isLoading, isError, refetch } = useProfile();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Internal Server Error</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-[30vh] bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute top-4 right-4 flex space-x-4">
          <Link href="/">
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </Link>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <Image
              src="data:image/jpeg;base64,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" // Replace with actual user image path
              alt="User Icon"
              width={64}
              height={64}
            />
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{profile?.name}</h2>
            <p>{profile?.email}</p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-start mt-16">
        <h1 className="text-3xl font-bold">Welcome to the application</h1>
      </div>
    </div>
  );
}
