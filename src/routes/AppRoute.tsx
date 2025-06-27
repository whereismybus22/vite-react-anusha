import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "../pages/WelcomePage";
import SignupPage from "../pages/SignupPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import UploadFlowPage from "../pages/UploadFlowPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/create-project" element={<CreateProjectPage />} />
      <Route path="/upload/:projectId" element={<UploadFlowPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
