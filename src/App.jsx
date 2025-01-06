import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={
            <div>
              <UploadPage />
            </div>
          } />
           <Route path="/result" element={
             <div>
                <ResultPage />
             </div>
           } />
        </Routes>
        
        {/* Global Components (Render only on Landing Page) */}
        <Routes>
           <Route path="/" element={
                <>
                    <WhyChooseUs />
                    <Testimonials />
                    <Footer />
                </>
            }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;