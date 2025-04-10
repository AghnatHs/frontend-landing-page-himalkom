import React from "react";

const BGKiri = ({ className, imageUrl }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 1440 888"
    fill="none"
    className={className}
    preserveAspectRatio="xMidYMid slice"
    opacity="0.3"
  >
     <defs>
      {imageUrl && (
        <pattern id="bgImageLeft" patternUnits="userSpaceOnUse" width="100%" height="100%">
          <image
            href={imageUrl}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      )}
    </defs>

    <g filter="url(#filter0_d_496_314)">
      <path
        d="M-56.8709 13.1841C61.629 -63.7172 215.63 214.904 613.63 354.904C1011.63 494.904 1485.13 340.903 1485.13 340.903C1485.13 340.903 1526.13 401.887 1149.63 608.904C773.13 815.92 245.629 730.585 -56.8709 851.585C-359.371 972.585 -254.37 323.404 -254.37 323.404C-254.37 323.404 -175.371 90.0855 -56.8709 13.1841Z"
        fill={imageUrl ? "url(#bgImageLeft)" : "url(#paint0_linear_496_314)"}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_496_314"
        x="-276"
        y="0"
        width="1766.44"
        height="887.618"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="17" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.686275 0 0 0 0 0.882353 0 0 0 0 0.917647 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_496_314"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_496_314"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_496_314"
        x1="830.5"
        y1="492"
        x2="40"
        y2="479.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity="0.33" />
        <stop offset="0.855769" stopColor="white" stopOpacity="0.88" />
      </linearGradient>
    </defs>
  </svg>
);

const BGKanan = ({ className, imageUrl }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="100%" 
    height="100%" 
    viewBox="0 0 1440 888" 
    fill="none"
    className={className}
    preserveAspectRatio="xMidYMid slice"
    opacity="0.3"
  >
      <defs>
        {imageUrl && (
          <pattern id="bgImageRight" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image
              href={imageUrl}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
      </defs>
      
      <g filter="url(#filter0_d_604_221)">
        <path 
        d="M1488.31 13.1841C1369.81 -63.7172 1215.81 214.904 817.811 354.904C419.811 494.904 -53.6888 340.903 -53.6888 340.903C-53.6888 340.903 -94.6893 401.887 281.811 608.904C658.311 815.92 1185.81 730.585 1488.31 851.585C1790.81 972.585 1685.81 323.404 1685.81 323.404C1685.81 323.404 1606.81 90.0855 1488.31 13.1841Z" 
        fill={imageUrl ? "url(#bgImageRight)" : "url(#paint0_linear_604_221)"}
        shapeRendering="crispEdges"
        />
      </g>

      <defs>
        <filter 
          id="filter0_d_604_221" 
          x="-59" 
          y="0" 
          width="1766.44" 
          height="887.618" 
          filterUnits="userSpaceOnUse" 
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"
          />
          <feOffset dy="17"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0.686275 0 0 0 0 0.882353 0 0 0 0 0.917647 0 0 0 1 0"
          />
          <feBlend 
            mode="normal" 
            in2="BackgroundImageFix" 
            result="effect1_dropShadow_604_221"
          />
          <feBlend 
            mode="normal" 
            in="SourceGraphic" 
            in2="effect1_dropShadow_604_221" 
            result="shape"  
          />
        </filter>
        <linearGradient 
          id="paint0_linear_604_221" 
          x1="600.94" 
          y1="492" 
          x2="1391.44" 
          y2="479.5" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.33"/>
          <stop offset="0.855769" stopColor="white" stopOpacity="0.88"/>
        </linearGradient>
      </defs>
    </svg>
);

export { BGKanan, BGKiri };