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
} from "./pages";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home username={username} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lesson-detail" element={<LessonDetail />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-detail" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
