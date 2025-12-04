"use client";

import Link from "next/link";

export default function BackHomeButton() {
  return (
    <div className="flex justify-center pb-12 md:pb-16">
      <Link
        href="/"
        className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Return to homepage"
      >
        Back Home
      </Link>
    </div>
  );
}

