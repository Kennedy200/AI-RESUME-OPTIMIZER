import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import logo from "../assets/CareerBoost.jpg";
import picture from "../assets/picture.jpg";

const LandingPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Top Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="CareerBoost AI Logo"
              className="w-10 h-10 mr-2 rounded-full"
            />
            <h1 className="text-xl font-bold text-blue-700">CareerBoost AI</h1>
          </div>
          {/* Navigation Links (Hidden on small devices) */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-6">
              <li>
                <Link to="/upload" className="text-blue-700 font-medium hover:text-blue-900">
                  CV Analysis
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-blue-700 font-medium hover:text-blue-900">
                  AI-Powered Insights
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">
            AI-Powered CV Optimization for Career Growth
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            CareerBoost AI analyzes your Resume with cutting-edge AI, helping you identify
            skill gaps, optimize for recruiter impact, and prepare for your dream career.
          </p>
          <div>
            <Link
              to="/upload"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <img
            src={picture}
            alt="AI Resume Optimization"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default LandingPage;
