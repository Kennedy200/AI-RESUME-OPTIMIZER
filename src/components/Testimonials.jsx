import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Profile1 from "../assets/profile1.jpg";
import Profile2 from "../assets/profile2.jpg";

const Testimonials = () => {
  const handleSeeAllStories = () => {
    toast.success("More stories coming soon!", {
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "#1E3A8A", // Blue
        color: "#FFFFFF", // White text
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
      },
    });
  };

  return (
    <section className="bg-gray-50 py-16">
      <Toaster />
      <div className="container mx-auto px-4 sm:px-6">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-4">
          What Our Customers Love
        </h3>
        <p className="text-gray-600 text-center mb-12">
          Here's what some of our users have to say about CareerBoost AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={Profile1} // Replace with actual user image path
                alt="Maliks January"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h5 className="font-bold text-blue-800">Maliks January</h5>
                <p className="text-sm text-gray-500">Product Designer</p>
              </div>
            </div>
            <p className="text-gray-700">
              “The number of interviews I got after using CareerBoost versus my own resume was a game-changer. I’d estimate about a 300% increase in responses, interviews, and feedback!”
            </p>
            <div className="flex mt-4">
              <span className="text-yellow-500 text-lg">★★★★★</span>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={Profile2} // Replace with actual user image path
                alt="Renit Vivie"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h5 className="font-bold text-blue-800">Renit Vivie</h5>
                <p className="text-sm text-gray-500">Front-End Developer</p>
              </div>
            </div>
            <p className="text-gray-700">
              “I had a near-zero interview rate using my old resume. After just one month of using CareerBoost, I was contacted by nearly half of the positions I applied for. Thanks CareerBoost!”
            </p>
            <div className="flex mt-4">
              <span className="text-yellow-500 text-lg">★★★★★</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSeeAllStories}
          >
            See All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
