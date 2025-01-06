import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Why Choose CareerBoost AI?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-xl font-bold text-blue-800 mb-4">
              AI-Powered CV Insights
            </h4>
            <p className="text-gray-700">
              Your resume, supercharged. Turn data into your career's secret weapon. Instantly transform how recruiters see your professional potential with AI-driven storytelling that makes your achievements pop.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-xl font-bold text-blue-800 mb-4">
              Skill Gap Analysis
            </h4>
            <p className="text-gray-700">
              Spot your blind spots. Transform weaknesses into your next career breakthrough. Our intelligent algorithm pinpoints exactly where you can level up, matching your skills to industry demands in real-time.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-blue-50 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-xl font-bold text-blue-800 mb-4">
              Career Path Guidance
            </h4>
            <p className="text-gray-700">
              Your personal career GPS. Navigate professional growth with laser-precision. We decode job market trends, your unique talents, and emerging opportunities to chart a strategic course for your dream career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
