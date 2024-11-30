import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGamingMode, setIsGamingMode] = useState(false);
  const [gamingTime, setGamingTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);

  useEffect(() => {
    document.title = `Work Timer - ${formatTime(time)}`;
  }, [time]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (isGamingMode) {
          setGamingTime((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
              setIsRunning(false);
              alert("Gaming time is over!");
              return 0;
            }
            return newTime;
          });
        } else {
          setTime((prevTime) => prevTime + 1);
          setTotalWorkTime((prevTime) => prevTime + 1);
          setGamingTime((prevTime) => prevTime + 0.2);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isGamingMode]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleWorkReset = () => {
    setTime(0);
    setIsRunning(false);
  };
  const handleGamingReset = () => {
    setGamingTime(0);
    setIsGamingMode(false);
  };
  const handleGamingMode = () => {
    if (!isRunning) {
      setIsGamingMode((prevMode) => !prevMode);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-8 bg-gray-800 shadow-lg rounded-md"
      animate={{
        rotateY: isGamingMode ? 180 : 0,
        scaleX: isGamingMode ? -1 : 1
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <div>
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-100">Max Productivity</h2>
        <div className="flex flex-col items-center gap-8">
          <div className={`text-6xl font-mono font-semibold ${isGamingMode ? 'text-green-400' : 'text-gray-100'}`}>
            {isGamingMode ? formatTime(gamingTime) : formatTime(time)}
          </div>
          <div className="flex gap-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-blue-600 text-gray-100 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700 transition-colors"
              >
                Pause
              </button>
            )}
            {!isRunning && (
              <button
                onClick={handleGamingMode}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isGamingMode 
                    ? 'bg-green-600 text-gray-100 hover:bg-green-700' 
                    : 'bg-gray-600 text-gray-100 hover:bg-gray-700'
                }`}
              >
                {isGamingMode ? 'Exit Gaming Mode' : 'Gaming Mode'}
              </button>
            )}
            {isRunning && (
              <button
                onClick={handleWorkReset}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Reset Work
              </button>
            )}
            {isGamingMode && (
              <button
                onClick={handleGamingReset}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                Reset Gaming
              </button>
            )}
          </div>
          <div className="flex gap-4 text-gray-400">
            <div>Total Work Time: {formatTime(totalWorkTime)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;