import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4">404</h1>
      <p className="text-lg mb-8">Project not found</p>
      <Link
        href="/"
        className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-colors font-medium"
      >
        Back Home
      </Link>
    </div>
  );
}


