import { Routes, Route } from "react-router-dom";

// 인증 불필요 페이지
import Login from "../pages/Login";
import RegisterForm from "../pages/RegisterForm";
import Dashboard from "../pages/Dashboard";
// 레이아웃 & 라우팅 헬퍼
import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute";
import Contents from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ 인증 불필요 */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/oral-check" element={<OralCheckPage />} /> */}
      <Route path="/register" element={<RegisterForm />} /> {/* ✅ 인증 필요 */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/contents"
        element={
          <PrivateRoute>
            <MainLayout>
              <Contents />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
