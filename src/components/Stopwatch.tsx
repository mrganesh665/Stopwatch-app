"use client";
import React, { useState, useEffect, useRef } from "react";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time: number) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor((time / 3600000) % 60);
    return `${hours > 0 ? `${hours}:` : ""}${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="text-center text-3xl p-4">Stopwatch</div>
      <div className="text-center text-7xl  mt-10">{formatTime(time)}</div>
      <div className="flex justify-center mt-10">
        <div className="text-center text-2xl flex justify-around w-[600px] items-center">
          {!isRunning ? (
            <button  onClick={handleStart} className="p-8 bg-slate-500 rounded-md">
              Start
            </button>
          ) : (
            <button onClick={handleStop} className="p-8 bg-slate-500 rounded-md">
              Stop
            </button>
          )}
          <button onClick={handleReset} className="p-8 bg-slate-500 rounded-md">
            Reset 
          </button>
       
        </div>
      </div>

      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
