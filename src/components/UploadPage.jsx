import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10 MB limit. Please upload a smaller file.");
      return;
    }

    if (
      !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)
    ) {
      setErrorMessage("Unsupported file format. Please upload a PDF or Word document.");
      return;
    }

    setUploadedFile(file);
    setShowToast(false);
    setErrorMessage(null);
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    setErrorMessage(null);
  };

  const handleFileDownload = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!uploadedFile) {
      if (!showToast) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    const formData = new FormData();
    formData.append("cvFile", uploadedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze-cv",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("[Debug] Full Response from backend:", response);
      console.log("[Debug] Response Data from backend:", response.data);

      const { overallScore, sections, recommendations, courseSuggestions } = response.data;

      if (!overallScore || !sections || !recommendations || !courseSuggestions) {
        console.warn("Incomplete feedback data received from backend.");
        setErrorMessage("Failed to analyze the CV. Please try again.");
        setIsAnalyzing(false);
        return;
      }

      navigate("/result", { state: { feedback: response.data } });
    } catch (error) {
      console.error("[Error] Failed to analyze CV:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred while analyzing your CV. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* 🔥 Stylish Hero Section */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-blue-700 to-purple-600 text-white rounded-2xl shadow-lg p-8 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Is Your Resume <span className="text-yellow-300">Good Enough?</span>
        </h1>
        <p className="mt-3 text-lg md:text-xl font-light opacity-90">
          Get instant AI-powered feedback with 16 key performance checks to boost your resume.
        </p>
        <div className="mt-5 flex justify-center">
          <button className="bg-yellow-400 text-blue-900 px-6 py-2 text-lg font-semibold rounded-full shadow-md hover:bg-yellow-300 transition-all">
            Try for Free 🚀
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Please upload a file before analyzing.
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 left-4 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Upload Your Resume</h3>
        <div
          className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer 
            ${dragOver ? "bg-blue-50 border-blue-500" : "border-blue-400 hover:bg-blue-50"}`}
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          {uploadedFile ? (
            <div>
              <p className="text-gray-700">
                <strong>File Name:</strong> {uploadedFile.name}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>File Size:</strong> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <p className="text-gray-500">
              Drag & drop or click to choose a file <br />
              <span className="text-sm text-gray-400">(Max file size: 10 MB)</span>
            </p>
          )}
        </div>

        <div className="relative mt-6">
          {isAnalyzing ? (
            <div className="flex justify-center items-center h-12">
              <div className="loader"></div>
            </div>
          ) : (
            <button
              className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 focus:outline-none"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
