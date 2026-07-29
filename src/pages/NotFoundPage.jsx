import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="text-8xl font-black text-blue-500">404</h1>
      <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-blue-500 px-8 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600 hover:scale-105"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
