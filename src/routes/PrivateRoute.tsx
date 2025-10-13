// import { Navigate } from "react-router-dom";

// interface PrivateRouteProps {
//   children: JSX.Element;
// }

// export default function PrivateRoute({ children }: PrivateRouteProps) {
//   const accessToken = localStorage.getItem("accessToken");

//   if (!accessToken) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }
// import { Navigate, useLocation } from "react-router-dom";

// interface PrivateRouteProps {
//   children: JSX.Element;
// }
// export default function PrivateRoute({ children }: PrivateRouteProps) {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

//   // ✅ 대시보드는 로그인 체크 제외
//   if (location.pathname === "/dashboard") {
//     return children;
//   }

//   // 그 외 페이지는 로그인 필수
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
