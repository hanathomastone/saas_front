import { Routes, Route } from "react-router-dom";

// 인증 불필요 페이지
import Login from "../pages/Login";
import RegisterVerify from "../pages/RegisterVerify";
import RegisterForm from "../pages/RegisterForm";
import RegisterExtra from "../pages/RegisterExtra";
import FindPassword from "../pages/FindPassword";
import ResetPassword from "../pages/ResetPassword";
import Contact from "../pages/Contact";
import OralCheckPage from "../pages/OralCheckPage";
import OralCheckCamera from "../pages/OralCheckCamera";

import OralCheckUpload from "../pages/OralCheckUpload";
// 인증 필요 페이지
import Dashboard from "../pages/Dashboard";
import Contents from "../pages/Contents";
import ContentDetail from "../pages/ContentDetail";
import OralCheckResult from "../pages/OralCheckResult";
import OralStatusPage from "../pages/OralStatusPage";
import UserPage from "../pages/UserPage";

// 레이아웃 & 라우팅 헬퍼
import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ 인증 불필요 */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/oral-check" element={<OralCheckPage />} /> */}
      <Route path="/register/verify" element={<RegisterVerify />} />
      <Route path="/register/form" element={<RegisterForm />} />
      <Route path="/register/extra" element={<RegisterExtra />} />
      <Route path="/find-password" element={<FindPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />

      {/* ✅ 인증 필요 (PrivateRoute + MainLayout으로 감싸기) */}
      <Route
        path="/oral-check"
        element={
          <PrivateRoute>
            <MainLayout>
              <OralCheckPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/oral-check/camera"
        element={
          <PrivateRoute>
            <MainLayout>
              <OralCheckCamera />
            </MainLayout>
          </PrivateRoute>
        }
      />
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

      <Route
        path="/contents/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <ContentDetail />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/oral-check/upload"
        element={
          <PrivateRoute>
            <MainLayout>
              <OralCheckUpload />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/oral-check/result"
        element={
          <PrivateRoute>
            <MainLayout>
              <OralCheckResult />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/oral-status"
        element={
          <PrivateRoute>
            <MainLayout>
              <OralStatusPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <MainLayout>
              <UserPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
