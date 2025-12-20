import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { TypographyDetail } from "../styled/HompageStylee";
import Watch from "../../assets/images/tether/Frame (5).svg?react";

const TOTAL_TIME = 600; 
const CIRCLE_SIZE = 171;
const STROKE_WIDTH = 1;

const FigmaTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const progress = (timeLeft / TOTAL_TIME) * 100;

  const radius = CIRCLE_SIZE / 2;
  const angle = (progress / 100) * 360 - 90; 
  const radians = (angle * Math.PI) / 180;
  const centerX = CIRCLE_SIZE / 2;
  const centerY = CIRCLE_SIZE / 2;

  const x = centerX + radius * Math.cos(radians);
  const y = centerY + radius * Math.sin(radians);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
   <svg style={{ position: "absolute", width: 0, height: 0 }}>
  <defs>
    <linearGradient id="figmaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      {/* شروع کاملاً سبز */}
      <stop offset="0%" stopColor="#40A578" />
      <stop offset="80%" stopColor="#40A578" />

      {/* انتهای گرادینت */}
      <stop offset="100%" stopColor="#2A3342" />
    </linearGradient>
  </defs>
</svg>



      {/* ۱. دایره خاکستری ثابت (پس‌زمینه نوار) */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={CIRCLE_SIZE}
        thickness={STROKE_WIDTH}
        sx={{
          position: "absolute",
          color: "rgba(65, 78, 99, 1)",
          "& .MuiCircularProgress-circle": {
            strokeWidth: "0.5px",
          },
        }}
      />

      {/* ۲. نوار پیشرفت اصلی با گرادینت طیفی */}
      <CircularProgress
        variant="determinate"
        value={progress}
        size={CIRCLE_SIZE}
        thickness={STROKE_WIDTH}
        sx={{
          position: "absolute",
          zIndex: 1,
          transform: "rotate(-90deg) !important", 
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
            stroke: "url(#figmaGradient)", 
            transition: "stroke-dashoffset 1s linear",
          },
        }}
      />

      {/* ۳. نقطه متحرک (Dot) */}
      <Box
        sx={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          width: 12,
          height: 12,
          backgroundColor: "#40A578",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
          transition: "all 1s linear",
          boxShadow: "0px 0px 12px 2px rgba(64, 165, 120, 0.7)",
        }}
      />

      <Box sx={{ zIndex: 0, justifyContent: "center", userSelect: "none" }}>
        <TypographyDetail sx={{ fontSize: "12px", color: "#FFFFFF", mb: "12px", fontWeight: 700,  }}>
          Time For Payment
        </TypographyDetail>

        <TypographyDetail sx={{ fontSize: "32px", color: "#40A578", fontWeight: 700,  }}>
          {formatTime(timeLeft)}
        </TypographyDetail>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", mt: "25px" }}>
          <Watch style={{ width: 18, height: 18 }} />
          <TypographyDetail sx={{ fontSize: "14", color: "#FFFFFF", fontWeight: 700 }}>
            15 : 30
          </TypographyDetail>
        </Box>
      </Box>
    </Box>
  );
};

export default FigmaTimer;