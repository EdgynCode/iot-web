import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/RequireAuth";
import { NotFound } from "./components/not-found/NotFound";
import { masterAdminRoute, teacherRoute, learnerRoute } from "./datas/route.d";

function App() {
  const [username, setUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth allowedRoles="SuperAdmin" />}>
          <Route path="/" element={<Layout />}>
            {masterAdminRoute.map((route) => (
              <Route key={route.key} path={route.key} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles="Teacher" />}>
          <Route path="/" element={<Layout />}>
            {teacherRoute.map((route) => (
              <Route key={route.key} path={route.key} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles="Learner" />}>
          <Route path="/" element={<Layout />}>
            {learnerRoute.map((route) => (
              <Route key={route.key} path={route.key} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
