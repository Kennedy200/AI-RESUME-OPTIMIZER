import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root path with Layout component */}
        <Route path="/" element={<Layout />} />

        {/* Separate routes for upload and result */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;