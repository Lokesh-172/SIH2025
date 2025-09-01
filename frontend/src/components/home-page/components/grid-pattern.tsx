import React from 'react';

const GridPattern = () => {
  return (
    <div 
      className="w-full min-h-screen bg-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, #f0f0f0 1px, transparent 1px),
          linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '-0.5px -0.5px'
      }}
    />
  );
};

export default GridPattern;