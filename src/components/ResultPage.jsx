import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css"; // Import the CSS file

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState(null);
     const [error, setError] = useState(null);


    useEffect(() => {
        console.log("[Debug] location.state:", location.state);
        const analysis = location.state?.analysis;

       if (analysis) {
            // Extract score using regex
            const scoreMatch = analysis.match(/\*\*Overall Score:\*\*\s*(\d+(?:\.\d+)?)\/100/);
             let extractedScore = 0;
             if (scoreMatch && scoreMatch[1]) {
                  extractedScore = parseFloat(scoreMatch[1]);
              } else {
                   const scoreMatch = analysis.match(/\*\*Overall Score:\*\*\s*(\d+(?:\.\d+)?)\/(\d+)/);
                   if (scoreMatch && scoreMatch[1] && scoreMatch[2]) {
                      extractedScore = (parseFloat(scoreMatch[1]) / parseFloat(scoreMatch[2])) * 100;
                     } else {
                         const scoreMatch = analysis.match(/\*\*Score:\*\*\s*(\d+(?:\.\d+)?)\/100/);
                           if(scoreMatch && scoreMatch[1]){
                             extractedScore = parseFloat(scoreMatch[1]);
                             } else {
                                const scoreMatch = analysis.match(/\*\*Score:\*\*\s*(\d+(?:\.\d+)?)\/(\d+)/);
                                 if(scoreMatch && scoreMatch[1] && scoreMatch[2]){
                                       extractedScore = (parseFloat(scoreMatch[1]) / parseFloat(scoreMatch[2])) * 100;
                                  }
                             }
                        }
                    }

            setScore(extractedScore);
            // Remove score and asterisks from feedback and split into list items
           const feedbackWithoutScore = analysis.replace(/\*\*Overall Score:\*\*\s*\d+(\.\d+)?\/\d+/g, '').trim();
            const feedbackWithoutScore2 = feedbackWithoutScore.replace(/\*\*Score:\*\*\s*\d+(\.\d+)?\/\d+/g, '').trim();
          const feedbackWithoutAsterisks = feedbackWithoutScore2.replace(/\*\*/g, '');

           // Split feedback into list items
        const feedbackList = feedbackWithoutAsterisks.split('\n').filter(item => item.trim() !== '').map(item => item.trim());
        setFeedback(feedbackList);



         } else if(location.state?.error){
              setError(location.state.error);
             setFeedback(null)
            setScore(null)
         }
    }, [location]);



    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
                <div className="text-center">
                    <p className="text-red-500 mb-4">
                        {error}. Please try again.
                    </p>
                    <button
                        onClick={() => navigate("/upload")}
                         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                     >
                        Upload CV
                    </button>
                </div>
            </div>
        );
    }

    if (!feedback) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">
                        No analysis data available. Please upload a CV first.
                    </p>
                    <button
                       onClick={() => navigate("/upload")}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                    >
                        Upload CV
                    </button>
                </div>
            </div>
        );
    }

      // Function to extract YouTube links from courses
     const extractYouTubeLinks = (text) => {
         const courseRegex = /\*\*(.*?):\*\*\s(.*?)(?:\s+Courses from|\s+Consider learning its fundamentals through online courses\.)(.*?)(?=\n\*\*\w)/gs;
        const courses = [];
      let match;

      while ((match = courseRegex.exec(text)) !== null) {
            const [, title, , description] = match;
           const youtubeMatch = description.match(/(https?:\/\/[^\s]+?youtube\.com\S*)/);
           courses.push({
               title: title.trim(),
               description: description.trim(),
                youtubeLink: youtubeMatch ? youtubeMatch[1] : null,
            });
       }

         return courses;
    };
    const courses = extractYouTubeLinks(feedback.join('\n')); // Join the feedback for correct regex

    return (
        <div className="min-h-screen bg-gray-100 text-gray-700 font-roboto flex items-center justify-center p-4">
           <div className="container mx-auto p-6 w-full max-w-4xl">
              {/* Score Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                   <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">CV Analysis Result</h2>
                  </div>

              {/* Feedback Card */}
               <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Feedback</h3>
                       <ol className="text-gray-600 text-lg leading-relaxed list-decimal pl-5">
                           {feedback.map((item, index) => (
                              <li key={index} className="mb-2">
                                {item}
                              </li>
                           ))}
                       </ol>
                 </div>

                {/* Course Suggestions Card */}
                   {courses.length > 0 && (
                      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Course Suggestions</h3>
                                <ul className="pl-5">
                                  {courses.map((course, index) => (
                                      <li key={index} className="mb-3">
                                           <h5 className="text-lg font-medium text-gray-700">{course.title}</h5>
                                              <p className="text-gray-500 leading-relaxed">{course.description}</p>
                                                {course.youtubeLink && (
                                                   <a
                                                        href={course.youtubeLink}
                                                       target="_blank"
                                                      rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline block mt-1"
                                                    >
                                                        Watch on YouTube
                                                  </a>
                                               )}
                                       </li>
                                     ))}
                                 </ul>
                            </div>
                      )}
                <div className="text-center mt-8">
                     <button
                        onClick={() => navigate("/upload")}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Upload Another CV
                    </button>
                  </div>
            </div>
        </div>
    );
};

export default ResultPage;