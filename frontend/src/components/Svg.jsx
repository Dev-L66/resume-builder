import React from "react";

const Svg = () => {
  return (
    <div className="flex justify-center items-center" >
        <svg
        className="md:h-100 md:w-100 "
          viewBox="0 0 400 500"
          fill="silver"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient
              id="cardGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>

          {/* SVG elements */}
          <rect
            x="50"
            y="50"
            width="300"
            height="400"
            rx="20"
            
          />
          <circle
            cx="120"
            cy="120"
            r="25"
            
          />
          <rect
            x="160"
            y="105"
            width="120"
            height="8"
            rx="4"
            
          />
          <rect
            x="160"
            y="120"
            width="80"
            height="6"
            rx="3"
            
          />
          <rect
            x="70"
            y="170"
            width="260"
            height="4"
            rx="2"
            
          />
          <rect
            x="70"
            y="185"
            width="200"
            height="4"
            rx="2"
            
          />
          <rect
            x="70"
            y="200"
            width="240"
            height="4"
            rx="2"
            
          />
          <rect
            x="70"
            y="230"
            width="60"
            height="6"
            rx="3"
            
          />
          <rect
            x="70"
            y="250"
            width="40"
            height="15"
            rx="7"
           
          />
          <rect
            x="120"
            y="250"
            width="50"
            height="15"
            rx="7"
           
          />
          <rect
            x="180"
            y="250"
            width="45"
            height="15"
            rx="7"
           
          />
          <rect
            x="70"
            y="290"
            width="80"
            height="6"
            rx="3"
            
          />
          <rect
            x="70"
            y="310"
            width="180"
            height="4"
            rx="2"
            
          />
          <rect
            x="70"
            y="325"
            width="150"
            height="4"
            rx="2"
            
          />
          <rect
            x="70"
            y="340"
            width="200"
            height="4"
            rx="2"
            
          />

          {/* Animated elements */}
          <circle
            cx="320"
            cy="100"
            r="15"
           
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-10; 0,0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <rect
            x="30"
            y="300"
            width="12"
            height="12"
            rx="6"
            
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 5,0; 0,0"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          <polygon
            points="360,200 370,220 350,220"
           
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 360 210; 360 360 210; 0 360 210"
              dur="4s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>
  );
};

export default Svg;
