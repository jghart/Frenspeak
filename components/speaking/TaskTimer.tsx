'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { LuClock, LuTriangleAlert } from 'react-icons/lu';

interface TaskTimerProps {
    duration: number; // total seconds
    isRunning: boolean;
    onTimeUp: () => void;
}

export default function TaskTimer({ duration, isRunning, onTimeUp }: TaskTimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const onTimeUpRef = useRef(onTimeUp);
    onTimeUpRef.current = onTimeUp;

    // Reset when duration changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUpRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
    const isWarning = timeLeft <= 30 && timeLeft > 0;
    const isCritical = timeLeft <= 10 && timeLeft > 0;

    return (
        <div className={`card !p-3 transition-colors duration-300
            ${isCritical ? '!border-danger/50 bg-danger/5' : ''}
            ${isWarning && !isCritical ? '!border-warning/50 bg-warning/5' : ''}
        `}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {isWarning ? (
                        <LuTriangleAlert className={`w-4 h-4 ${isCritical ? 'text-danger animate-pulse' : 'text-warning'}`} />
                    ) : (
                        <LuClock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Time Remaining
                    </span>
                </div>
                <span className={`text-lg font-mono font-bold tabular-nums
                    ${isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-foreground'}
                `}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
                <div
                    className="progress-bar-fill transition-all duration-1000"
                    style={{
                        width: `${progress}%`,
                        background: isCritical
                            ? 'var(--danger)'
                            : isWarning
                                ? 'var(--warning)'
                                : undefined,
                    }}
                />
            </div>
        </div>
    );
}
