import React, { useState } from 'react';

function ClickableFile({ fileResponse, handleDownload }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const handleMouseOver = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);

    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    e.target.style.color = 'blue';
    e.target.style.textDecoration = 'underline';
  };

  const handleMouseOut = (e) => {
    setShowTooltip(false);
    setFadeIn(false);

    e.target.style.color = 'black';
    e.target.style.textDecoration = 'none';
  };

  return (
    <div
      onClick={() => handleDownload(fileResponse.id)}
      style={{
        cursor: 'pointer',
        color: 'black',
        textDecoration: 'none',
        position: 'relative',
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {fileResponse.fileName}
      {showTooltip && tooltipPosition && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '3px 6px',
            borderRadius: '3px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 1000,
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          İndirmek için tıklayınız
        </div>
      )}
    </div>
  );
}

export default ClickableFile;
