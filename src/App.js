import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Lessons, Students, Login } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </Router>
  );
}

export default App;
