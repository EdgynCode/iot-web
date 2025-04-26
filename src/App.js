import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, ForgotPassword } from "./pages";
import Layout from "./components/layout/Layout";
import { NotFound } from "./components/not-found/NotFound";
import { teacherRoute, learnerRoute, superAdminRoute } from "./datas/route.d";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";

function App() {
  const isLoggedIn = localStorage.getItem("user") ? 1 : 0;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const decode = user ? jwtDecode(user?.jwtAccessToken) : null;
  const role = decode ? decode.role : null;

  // Get permissions from localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions")) || {};

  return (
    <Router>
      <Routes>
        {/* unauthorized route */}
        {!isLoggedIn ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          isLoggedIn === 1 && (
            <>
              <Route element={<ProtectedRoute />}>
                <Route path={``} element={<Layout />}>
                  {(role === "SuperAdmin"
                    ? superAdminRoute
                    : role === "Teacher"
                    ? teacherRoute
                    : learnerRoute
                  )
                    .filter((route) => permissions[route.key] !== false)
                    .map((route) => (
                      <Route
                        key={`${role}/${route.key}`}
                        path={route.key}
                        element={route.element}
                      />
                    ))}
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </>
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
