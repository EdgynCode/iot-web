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
  Login,
  Register,
  Devices,
} from "./pages";
import Layout from "./components/layout/Layout";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home username={username} />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson-detail/:key" element={<LessonDetail />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student-detail" element={<StudentDetail />} />
          <Route path="/account-detail" element={<AccountDetail />} />
          <Route path="/devices" element={<Devices />} />
        </Route>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
