import React from "react";
import { useLocation } from "react-router-dom";

const formatTitle = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace("Ats", "ATS")
    .replace("Pdf", "PDF")
    .replace("Url", "URL");
};

const getDefaultMessage = (value, key) => {
  if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === "object" && Object.keys(value).length === 0)) {
    return key === "softSkills" || key === "missingSkills" ? "Not provided" : "No information available.";
  }
  return value;
};

const ResultPage = () => {
  const location = useLocation();
  const feedback = location.state?.feedback;

  if (!feedback) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 px-6">
        <p className="text-red-500 text-2xl font-bold text-center">
          No feedback data available. Please try uploading your CV again.
        </p>
      </div>
    );
  }

  const { overallScore, sections, recommendations, courseSuggestions } = feedback;

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-blue-700 mb-12">
          RESUME ANALYSIS RESULT
        </h1>

        {/* Overall Score Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Overall Score</h2>
          <div className="relative w-3/4 md:w-1/2 mx-auto bg-gray-300 h-8 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bg-blue-500 h-full transition-all duration-500"
              style={{ width: `${overallScore || 0}%` }}
            ></div>
          </div>
          <p className="mt-3 text-xl font-medium text-gray-800">
            {overallScore ? `${overallScore}%` : "No score available."}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections &&
            Object.entries(sections).map(([key, value]) => {
              const formattedTitle = formatTitle(key);
              const defaultValue = getDefaultMessage(value, key);

              return (
                <div key={key} className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{formattedTitle}</h3>

                  <div className="text-lg text-gray-700 break-words overflow-hidden">
                    {typeof defaultValue === "string" ? (
                      <p className="truncate">{defaultValue}</p>
                    ) : Array.isArray(defaultValue) ? (
                      <ul className="list-disc ml-6">
                        {defaultValue.length > 0 ? (
                          defaultValue.map((item, index) => <li key={index} className="truncate">{item}</li>)
                        ) : (
                          <li>No information available.</li>
                        )}
                      </ul>
                    ) : typeof defaultValue === "object" ? (
                      <ul className="list-disc ml-6">
                        {Object.entries(defaultValue).length > 0 ? (
                          Object.entries(defaultValue).map(([subKey, subValue]) => (
                            <li key={subKey} className="truncate font-medium">
                              {formatTitle(subKey)}: <span className="text-gray-600">{String(subValue)}</span>
                            </li>
                          ))
                        ) : (
                          <li>No relevant data available.</li>
                        )}
                      </ul>
                    ) : (
                      <p>No information available.</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Recommendations Section */}
        {recommendations?.length > 0 && (
          <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Recommendations</h3>
            <ul className="list-disc ml-6 text-lg text-gray-700">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="truncate">{recommendation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Course Suggestions Section */}
        {courseSuggestions?.length > 0 && (
          <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Course Suggestions</h3>
            <ul className="list-disc ml-6 text-lg text-gray-700">
              {courseSuggestions.map((course, index) => (
                <li key={index} className="mb-4">
                  <p className="font-bold text-lg truncate">{course.title} - {course.platform}</p>
                  <p className="text-gray-600 truncate">{course.description}</p>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Course
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
