import React from 'react';

const TestImage = ({ src, alt }) => {
  return (
    <div className="A_testImageContainer">
      <img src={src} alt={alt} className="A_testQuestionImage" />
    </div>
  );
};

export default TestImage;
