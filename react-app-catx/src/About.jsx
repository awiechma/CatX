import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Impressum from "./components/About/Impressum";

const About = () => {
  return (
    <div>
      <Navbar />
      <Impressum />
      <Footer />
    </div>
  );
};

export default About;
