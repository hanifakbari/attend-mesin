"use client";

import React, { useState, useEffect } from "react";

export const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentTime() {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Jakarta",
    };

    const now = new Date();
    return now.toLocaleTimeString("en-US", options);
  }

  return (
    <div>
      <h2 className="zone-title">{currentTime}</h2>
    </div>
  );
};

export default TimeDisplay;
