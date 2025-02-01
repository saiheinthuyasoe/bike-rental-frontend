import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Header / Logo */}
      <header className="mb-12">
        <Image
          src="/favicon.ico" // Replace with your app logo
          alt="Bike Rent App Logo"
          width={120}
          height={120}
        />
        <h1 className="mt-4 text-4xl font-extrabold text-gray-800">
          Bike Rent App
        </h1>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Rent Your Ride Today!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover a wide range of bikes available for rent at affordable prices.
          Whether you&apos;re a renter, lender, or an admin managing the system, our platform makes renting easy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Bike Rent App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
