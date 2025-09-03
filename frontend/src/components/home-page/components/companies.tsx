'use client'

import React from 'react';
import ImageScroller from './scroller';

const Companies = () => {
  const imageNames = [
    'img1.jpg', 'img2.png', 'img3.jpg', 'img4.png', 'img5.jpg',
    'img6.png', 'img7.jpg', 'img8.png', 'img9.jpg', 'img10.png'
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 text-center py-16">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Our Partners & Collaborations
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trusted by leading companies and organizations worldwide
        </p>
      </div>

      {/* Image Scroller */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <ImageScroller 
          imageNames={imageNames}
          imageAltPrefix="Partner"
          speed="normal"
          containerHeight="sm"
          gap="md"
          rounded="lg"
          shadow={true}
          hoverEffect="scale"
          className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50"
          maskGradient={true}
        />
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">500+</div>
          <div className="text-sm text-gray-600">Partners</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">50+</div>
          <div className="text-sm text-gray-600">Countries</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">10M+</div>
          <div className="text-sm text-gray-600">Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">99.9%</div>
          <div className="text-sm text-gray-600">Uptime</div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
