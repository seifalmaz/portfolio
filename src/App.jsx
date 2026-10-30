import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./components/layout/RootLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { PortfolioProvider } from "./context/PortfolioContext";
import Cursor from "./components/Cursor";
import HomePage from "./pages/HomePage";

// Lazy-loaded secondary route components for optimal initial bundle performance
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#292725] flex flex-col items-center justify-center gap-4 transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-[#D2C7B6]/20 border-t-[#6E2638] animate-spin" />
        <span className="absolute text-xs font-black tracking-tight text-[#FAF6EE] select-none">
          SA
        </span>
      </div>
      <p className="text-[11px] font-mono uppercase tracking-widest text-[#9AA69A]">
        Loading
      </p>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <PortfolioProvider>
      <Cursor />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Admin Authentication & Management */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Public Portfolio Routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </PortfolioProvider>
  );
}

export default App;
