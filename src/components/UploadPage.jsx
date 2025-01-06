import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const UploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10 MB limit. Please upload a smaller file.");
        return;
      }

      if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
        alert("Unsupported file format. Please upload a PDF or Word document.");
        return;
      }

      setUploadedFile(file);
      setShowToast(false); // Hide toast if a file is uploaded
    }
  };

  const handleFileRemove = () => setUploadedFile(null);

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

    const formData = new FormData();
    formData.append("cvFile", uploadedFile); // Corrected: Use 'cvFile' as the field name


    try {
        const response = await axios.post("http://localhost:5000/analyze-cv", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
      console.log("[Debug] Response from backend:", response.data);

      navigate("/result", { state: { analysis: response.data.feedback } });

    } catch (error) {
      console.error("[Error] Failed to analyze CV:", error.response?.data || error.message);
      if(error.response?.data.message){
           navigate("/result", { state: { error: error.response.data.message } })
       }else{
         alert("An error occurred while analyzing your CV. Please try again.");
       }

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
      {showToast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
          Please upload a file before analyzing.
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Upload Your CV</h3>
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

        {uploadedFile && (
          <div className="flex items-center justify-between mt-4 bg-blue-50 p-3 rounded-lg">
            <div className="text-gray-700 truncate">{uploadedFile.name}</div>
            <div className="flex space-x-4">
              <button
                onClick={handleFileDownload}
                className="text-blue-600 hover:text-blue-800"
              >
                <FiDownload size={20} />
              </button>
              <button
                onClick={handleFileRemove}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        )}

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
              Analyze CV
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;