'use client';

import { useState, useCallback, useRef } from 'react';
import {
    LuMic,
    LuChevronRight,
    LuRotateCcw,
    LuSend,
    LuLoader,
    LuVolume2,
    LuPlay,
} from 'react-icons/lu';
import SpeechRecorder from '@/components/speaking/SpeechRecorder';
import TaskTimer from '@/components/speaking/TaskTimer';
import FeedbackCard from '@/components/speaking/FeedbackCard';
import {
    getRandomPrompt,
    TASK_LABELS,
    TASK_DESCRIPTIONS,
    TASK_TIME_LABELS,
    type TCFPrompt,
} from '@/lib/data/tcf-prompts';

type TaskType = 'task1' | 'task2' | 'task3';
type Stage = 'select' | 'ready' | 'speaking' | 'submitting' | 'feedback';

interface FeedbackData {
    score: number;
    wordCount: number;
    keywordsMatched: string[];
    keywordsMissed: string[];
    feedback: string[];
    level: 'A2' | 'B1' | 'B2';
}

export default function SpeakingPage() {
    const [stage, setStage] = useState<Stage>('select');
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
    const [currentPrompt, setCurrentPrompt] = useState<TCFPrompt | null>(null);
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
    const [error, setError] = useState('');
    const startTimeRef = useRef<number>(0);

    // ── Task Selection ─────────────────────────────────────────
    const handleSelectTask = useCallback((taskType: TaskType) => {
        const prompt = getRandomPrompt(taskType);
        setSelectedTask(taskType);
        setCurrentPrompt(prompt);
        setTranscript('');
        setFeedbackData(null);
        setError('');
        setStage('ready');
    }, []);

    // ── Start Speaking ─────────────────────────────────────────
    const handleStart = useCallback(() => {
        startTimeRef.current = Date.now();
        setStage('speaking');
    }, []);

    // ── Speak the examiner question via TTS ────────────────────
    const speakExaminerQuestion = useCallback(() => {
        if (!currentPrompt) return;
        const utterance = new SpeechSynthesisUtterance(currentPrompt.examinerQuestion);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }, [currentPrompt]);

    // ── Time Up ────────────────────────────────────────────────
    const handleTimeUp = useCallback(() => {
        setIsRecording(false);
        if (transcript.trim()) {
            handleSubmit();
        }
    }, [transcript]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Submit ─────────────────────────────────────────────────
    const handleSubmit = useCallback(async () => {
        if (!currentPrompt || !transcript.trim()) {
            setError('Please speak before submitting.');
            return;
        }

        setStage('submitting');
        setError('');

        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

        try {
            const res = await fetch('/api/speaking/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    promptId: currentPrompt.id,
                    transcript: transcript.trim(),
                    duration,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to submit');
                setStage('speaking');
                return;
            }

            setFeedbackData({
                score: data.score,
                wordCount: data.wordCount,
                keywordsMatched: data.keywordsMatched,
                keywordsMissed: data.keywordsMissed,
                feedback: data.feedback,
                level: data.level,
            });
            setStage('feedback');
        } catch {
            setError('Network error. Please try again.');
            setStage('speaking');
        }
    }, [currentPrompt, transcript]);

    // ── Reset ──────────────────────────────────────────────────
    const handleReset = useCallback(() => {
        window.speechSynthesis.cancel();
        setStage('select');
        setSelectedTask(null);
        setCurrentPrompt(null);
        setTranscript('');
        setFeedbackData(null);
        setError('');
    }, []);

    // ── Try Another (same task type) ───────────────────────────
    const handleTryAnother = useCallback(() => {
        if (selectedTask) {
            handleSelectTask(selectedTask);
        }
    }, [selectedTask, handleSelectTask]);

    return (
        <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuMic className="w-7 h-7 text-primary" />
                    Speaking Practice
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {stage === 'select'
                        ? 'Choose a TCF speaking task to practice'
                        : currentPrompt
                            ? TASK_LABELS[currentPrompt.taskType]
                            : ''}
                </p>
            </div>

            {/* ═══ STAGE: Task Selection ═══ */}
            {stage === 'select' && (
                <div className="grid gap-4">
                    {(['task1', 'task2', 'task3'] as TaskType[]).map((taskType) => (
                        <button
                            key={taskType}
                            onClick={() => handleSelectTask(taskType)}
                            className="card-glow text-left group cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {TASK_LABELS[taskType]}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {TASK_DESCRIPTIONS[taskType]}
                                    </p>
                                    <span className="badge badge-primary mt-2">
                                        {TASK_TIME_LABELS[taskType]}
                                    </span>
                                </div>
                                <LuChevronRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* ═══ STAGE: Ready (Prompt Preview) ═══ */}
            {stage === 'ready' && currentPrompt && (
                <div className="space-y-4 animate-slide-left">
                    {/* Examiner Question Card */}
                    <div className="card-glow !border-primary/20 bg-primary/5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary">TCF</span>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Examiner</p>
                                    <p className="text-xs text-primary font-medium">
                                        {currentPrompt.title}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={speakExaminerQuestion}
                                className="btn btn-ghost !py-1.5 !px-2.5 text-xs"
                                title="Listen to the question"
                            >
                                <LuVolume2 className="w-3.5 h-3.5" />
                                Listen
                            </button>
                        </div>

                        <p className="text-foreground leading-relaxed italic">
                            &ldquo;{currentPrompt.examinerQuestion}&rdquo;
                        </p>

                        <div className="mt-3 p-2.5 rounded-lg bg-surface/50 border border-border">
                            <p className="text-xs text-muted-foreground">
                                <span className="font-medium">Your task:</span>{' '}
                                {currentPrompt.prompt}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="card !bg-surface/50 text-sm text-muted-foreground space-y-2">
                        <p>⏱️ You have <span className="text-foreground font-medium">{TASK_TIME_LABELS[currentPrompt.taskType]}</span> to respond.</p>
                        <p>🎤 Click Start to begin — then click the microphone to record your answer in French.</p>
                        <p>📝 Your response will be scored on vocabulary, fluency, and task relevance.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button onClick={handleReset} className="btn btn-ghost">
                            <LuRotateCcw className="w-4 h-4" />
                            Back
                        </button>
                        <button onClick={handleStart} className="btn btn-primary btn-lg flex-1">
                            <LuPlay className="w-4 h-4" />
                            Start Speaking
                        </button>
                    </div>
                </div>
            )}

            {/* ═══ STAGE: Speaking ═══ */}
            {(stage === 'speaking' || stage === 'submitting') && currentPrompt && (
                <div className="space-y-4 animate-slide-left">
                    {/* Timer */}
                    <TaskTimer
                        duration={currentPrompt.timeLimit}
                        isRunning={stage === 'speaking'}
                        onTimeUp={handleTimeUp}
                    />

                    {/* Examiner Question (compact) */}
                    <div className="card !p-3 !border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-primary">Examiner:</span>
                            <button
                                onClick={speakExaminerQuestion}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                title="Listen again"
                            >
                                <LuVolume2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <p className="text-sm text-foreground/80 italic">
                            &ldquo;{currentPrompt.examinerQuestion}&rdquo;
                        </p>
                    </div>

                    {/* Speech Recorder */}
                    <SpeechRecorder
                        language="fr-FR"
                        onTranscriptChange={setTranscript}
                        onRecordingChange={setIsRecording}
                        disabled={stage === 'submitting'}
                    />

                    {/* Error */}
                    {error && (
                        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button onClick={handleReset} className="btn btn-ghost">
                            <LuRotateCcw className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!transcript.trim() || stage === 'submitting'}
                            className="btn btn-primary btn-lg flex-1"
                        >
                            {stage === 'submitting' ? (
                                <>
                                    <LuLoader className="w-4 h-4 animate-spin" />
                                    Scoring...
                                </>
                            ) : (
                                <>
                                    <LuSend className="w-4 h-4" />
                                    Submit Response
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* ═══ STAGE: Feedback ═══ */}
            {stage === 'feedback' && feedbackData && (
                <div className="space-y-4">
                    <FeedbackCard
                        score={feedbackData.score}
                        wordCount={feedbackData.wordCount}
                        keywordsMatched={feedbackData.keywordsMatched}
                        keywordsMissed={feedbackData.keywordsMissed}
                        feedback={feedbackData.feedback}
                        level={feedbackData.level}
                        transcript={transcript}
                    />

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button onClick={handleReset} className="btn btn-ghost">
                            <LuRotateCcw className="w-4 h-4" />
                            All Tasks
                        </button>
                        <button onClick={handleTryAnother} className="btn btn-primary btn-lg flex-1">
                            <LuChevronRight className="w-4 h-4" />
                            Try Another {selectedTask ? TASK_LABELS[selectedTask].split('—')[0] : ''}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
