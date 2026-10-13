import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./components/layout/RootLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { PortfolioProvider } from "./context/PortfolioContext";
import Cursor from "./components/Cursor";

// Lazy-loaded route components for optimal bundle splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
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