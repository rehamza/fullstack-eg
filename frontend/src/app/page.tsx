import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen  h-[30vh] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
      {/* Top-right corner buttons */}
      <div className="absolute top-0 right-0 p-6">
        <Link href="/login" className="mr-4">
          <button className="px-4 py-2  text-white bg-red-600 rounded-md hover:bg-red-700">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Registration
          </button>
        </Link>
      </div>
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold">Welcome To EG Website</h1>
    </div>
  );
}
