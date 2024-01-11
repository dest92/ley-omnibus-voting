import { useState, useEffect } from "react";

const AnimatedCounter = ({ start = 0, end = 1, duration = 1000, text="" }) => {
  const [counter, setCounter] = useState(start);

  useEffect(() => {
    // Calculate the increment for each interval
    let increment = (end - start) / (duration / 100);

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter + increment >= end) {
          clearInterval(interval);
          return end;
        }
        return prevCounter + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [end, start, duration]);

  return <div>{text}{counter.toFixed(0)}</div>;
};

export default AnimatedCounter;
