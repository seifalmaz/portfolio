import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./components/layout/RootLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { PortfolioProvider } from "./context/PortfolioContext";
import Cursor from "./components/Cursor";
import InitialPreloader from "./components/ui/InitialPreloader";
import HomePage from "./pages/HomePage";

// Lazy-loaded secondary route components for optimal initial bundle performance
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#1C1A19] flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6E2638] text-xs font-bold text-[#FAF6EE] shadow-sm">
          SA
        </span>
        <span className="text-base font-bold tracking-tight text-[#FAF6EE]">
          Seif Almaz<span className="text-[#6E2638]">.</span>
        </span>
      </div>
      <div className="mt-3 h-[2px] w-28 overflow-hidden rounded-full bg-[#FAF6EE]/10">
        <div className="h-full w-full bg-gradient-to-r from-[#6E2638] via-[#FAF6EE] to-[#6E2638] animate-pulse" />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <PortfolioProvider>
      <InitialPreloader />
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
