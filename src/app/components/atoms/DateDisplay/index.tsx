"use client";

import React, { useState, useEffect } from "react";

export const DateDisplay: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDate(): string {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const date = now.getDate();
    const month = now.toLocaleDateString("en-US", { month: "short" });
    const year = now.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div>
      <h2 className="zone-title">{currentDate}</h2>
    </div>
  );
};

export default DateDisplay;
