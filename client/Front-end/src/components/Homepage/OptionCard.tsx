import React from "react";
import { useNavigate } from "react-router-dom";

const OptionCard = ({
  name,
  image,
  buttonColor,
  hoverColor,
  extraClasses,
  pathToNavigate,
  cardTextContext,
}) => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };
  console.log(cardTextContext);
  return (
    <div
      className={`group relative w-96 h-72 bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d9d9d9] ${extraClasses}`}
    >
      {/* Image Section */}
      <div className="w-full h-4/5 flex justify-center items-center">
        <img
          src={image}
          alt="Card Image"
          className="w-[60%] h-[60%] group-hover:opacity-10"
        />
      </div>
      <p className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 p-5 text-lg font-medium text-[#414141]">
        {cardTextContext}
      </p>
      {/* Hover Overlay */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-20"
        style={{ backgroundColor: hoverColor }}
      />

      {/* Button Section */}
      <div className="absolute bottom-0 left-0 right-0 h-1/5 flex items-center justify-center z-10">
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
