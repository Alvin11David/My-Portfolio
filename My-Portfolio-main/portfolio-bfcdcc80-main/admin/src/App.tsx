import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProjectsList from "@/pages/ProjectsList";
import ProjectForm from "@/pages/ProjectForm";
import AboutEditor from "@/pages/AboutEditor";
import SkillsEditor from "@/pages/SkillsEditor";
import HeroEditor from "@/pages/HeroEditor";
import MessagesList from "@/pages/MessagesList";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="skills" element={<SkillsEditor />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="messages" element={<MessagesList />} />
      </Route>
    </Routes>
  );
}
