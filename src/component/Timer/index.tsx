import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [startTime, setStartTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval:any;
        if (isActive) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        setIsActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, currentTime]);

    const handleStart = () => {
        setCurrentTime(startTime);
        setIsActive(true);
    };

    const handleInputChange = (e:any) => {
        setStartTime(parseInt(e.target.value));
    };

    const handlePause = () => {
        setIsActive(false);
    };

    return (
        <div>
            <div>
                <label>Enter start time (seconds):</label>
                <input type="number" value={startTime} onChange={handleInputChange} />
            </div>
            <div>Current Time: {currentTime}</div>
            <div>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
            </div>
        </div>
    );
};

export default Timer;
