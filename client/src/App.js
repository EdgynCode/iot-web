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
  Login,
  Register,
  Devices,
  ExamDetail,
} from "./pages";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home username={username} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lesson-detail" element={<LessonDetail />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-detail" element={<StudentDetail />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/exam-detail" element={<ExamDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
