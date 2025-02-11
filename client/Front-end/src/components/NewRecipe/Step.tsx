import React, { useState, useEffect } from "react";

const Step = ({ index, step, setSteps, steps }) => {
  const [textChange, setTextChange] = useState({
    step: index + 1,
    context: step.context,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTextChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //3 sekunde nakon pisanja updatea se steps state, tj. šalje se sadržaj svakog koraka
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setSteps((prevState) => {
        const updatedSteps = prevState.map((step, idx) =>
          idx === index ? textChange : step
        );
        return updatedSteps;
      });
    }, 3000);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [textChange]);

  return (
    <div className="step-div">
      <label htmlFor={`step-${index}`}>{index + 1}.</label>
      <textarea
        type="text"
        id={`step-${index}`}
        name="context"
        className="step-input"
        value={textChange.context}
        onChange={handleChange}
      />
    </div>
  );
};

export default Step;
