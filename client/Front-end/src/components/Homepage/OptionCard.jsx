import React from "react";
import { useNavigate } from "react-router-dom";

const OptionCard = ({
  name,
  image,
  buttonColor,
  extraClasses,
  pathToNavigate,
}) => {
  const navigate = useNavigate(); // Corrected: useNavigate should be inside the component

  const handleRedirect = (path) => {
    navigate(path); // Use navigate with the provided path
  };
  return (
    <div
      className={`w-96 h-72 bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d9d9d9] ${extraClasses}`}
    >
      {/* Image Section */}
      <div className="w-100% h-4/5  flex justify-center items-center">
        <img src={image} alt="Card Image" className="w-[60%] h-[60%] " />
      </div>

      {/* Button Section */}
      <div className="h-1/5 flex items-center justify-center">
        <button
          style={{ backgroundColor: buttonColor }}
          onClick={() => handleRedirect(pathToNavigate)}
          className="w-[96%] px-4 py-2 text-white font-semibold rounded hover:opacity-80"
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default OptionCard;
