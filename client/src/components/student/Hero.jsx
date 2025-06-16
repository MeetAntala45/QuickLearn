import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-gray-100/70">
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold tex-gray-800 max-w-3xl mx-auto">
        Empower your future with the courses designed to fit your choices.    
      </h1>
        <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
          We bring together world-class instuctors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
        <p className="md:hidden text-gray-500 max-w-sm mx-auto">
          We bring together world-class instuctors to help you achieve your
          professional goals.
        </p>
      
    </div>
  );
};

export default Hero;
