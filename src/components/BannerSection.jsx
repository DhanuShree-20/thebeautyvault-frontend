import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerSection = ({ imgSrc, targetPage }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-6 cursor-pointer overflow-hidden">
      <img 
        src={imgSrc} 
        alt="Promotional Banner" 
        className="w-full h-auto rounded-xl hover:opacity-95 transition-opacity"
        onClick={() => navigate(targetPage)}
      />
    </div>
  );
};

export default BannerSection;