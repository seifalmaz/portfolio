import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#292725] px-6 text-center text-[#FAF6EE]">
      <h1 className="text-8xl font-black text-[#6E2638] tracking-tight">404</h1>
      <h2 className="mt-4 text-3xl font-bold tracking-tight">Page Not Found</h2>
      <p className="mt-2 max-w-md text-sm text-[#9AA69A] leading-relaxed">
        The page you are looking for does not exist, has been moved, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638] px-8 py-3 text-sm font-semibold text-[#FAF6EE] shadow-lg shadow-[#6E2638]/25 transition hover:bg-[#451824] hover:scale-105"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
