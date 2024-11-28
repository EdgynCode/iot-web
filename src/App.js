import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Lessons,
  LessonDetail,
  Students,
  StudentDetail,
  AccountDetail,
  EditAccountDetail,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  Devices,
} from "./pages";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/RequireAuth";
import { NotFound } from "./components/not-found/NotFound";
function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth allowedRoles="SuperAdmin" />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home username={username} />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson-detail/:key" element={<LessonDetail />} />
            <Route path="/students" element={<Students />} />
            <Route path="/student-detail/:id" element={<StudentDetail />} />
            <Route path="/account-detail" element={<AccountDetail />} />
            <Route
              path="/edit-account-detail"
              element={<EditAccountDetail />}
            />
            <Route path="/devices" element={<Devices />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
