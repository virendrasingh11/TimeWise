import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Play, Pause, Square } from 'lucide-react';

const Timer = ({ task, onUpdate }) => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(task.timeSpent || 0);

    // Event Loop / Closures demonstration implicitly through intervals and states
    useEffect(() => {
        let interval = null;
        if (isActive && !task.completed) {
            interval = setInterval(() => {
                setTime(time => time + 1); // Closure on time update
            }, 60000); // 1 minute intervals for simplicity in the mock timer. Wait, let's track seconds for UX
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, task.completed]);

    const handleStart = () => setIsActive(true);
    const handlePause = () => setIsActive(false);

    const handleStopAndSave = async () => {
        setIsActive(false);
        try {
            const { data } = await api.patch(`/tasks/${task._id}`, { timeSpent: time });
            if (onUpdate) onUpdate(data);
        } catch (error) {
            console.error("Failed to save time", error);
        }
    };

    return (
        <div className="timer-controls">
            <span className="time-display">{time} min</span>
            {!isActive ? (
                <button onClick={handleStart} className="btn-icon start" disabled={task.completed} title="Start"><Play size={16} /></button>
            ) : (
                <button onClick={handlePause} className="btn-icon pause" title="Pause"><Pause size={16} /></button>
            )}
            <button onClick={handleStopAndSave} className="btn-icon stop" disabled={task.completed} title="Save Time"><Square size={16} /></button>
        </div>
    );
};

export default Timer;
