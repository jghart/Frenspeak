'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { LuMic, LuMicOff, LuCircle } from 'react-icons/lu';

interface SpeechRecorderProps {
    language?: string;
    onTranscriptChange: (transcript: string) => void;
    onRecordingChange?: (isRecording: boolean) => void;
    disabled?: boolean;
}

export default function SpeechRecorder({
    language = 'fr-FR',
    onTranscriptChange,
    onRecordingChange,
    disabled = false,
}: SpeechRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: any) => {
            let interim = '';
            let final = '';

            for (let i = 0; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript + ' ';
                } else {
                    interim += result[0].transcript;
                }
            }

            setFinalTranscript(final);
            setInterimTranscript(interim);
            onTranscriptChange((final + interim).trim());
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                setIsSupported(false);
            }
        };

        recognition.onend = () => {
            // If we're still supposed to be recording, restart
            if (recognitionRef.current?._shouldRestart) {
                try {
                    recognition.start();
                } catch (e) {
                    // ignore
                }
            } else {
                setIsRecording(false);
                onRecordingChange?.(false);
            }
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
            try {
                recognition.stop();
            } catch (e) {
                // ignore
            }
        };
    }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

    const startRecording = useCallback(() => {
        if (!recognitionRef.current || disabled) return;

        setFinalTranscript('');
        setInterimTranscript('');
        onTranscriptChange('');

        try {
            recognitionRef.current._shouldRestart = true;
            recognitionRef.current.start();
            setIsRecording(true);
            onRecordingChange?.(true);
        } catch (e) {
            console.error('Failed to start recording:', e);
        }
    }, [disabled, onTranscriptChange, onRecordingChange]);

    const stopRecording = useCallback(() => {
        if (!recognitionRef.current) return;

        recognitionRef.current._shouldRestart = false;
        try {
            recognitionRef.current.stop();
        } catch (e) {
            // ignore
        }
        setIsRecording(false);
        onRecordingChange?.(false);
    }, [onRecordingChange]);

    if (!isSupported) {
        return (
            <div className="card !border-warning/30 bg-warning/5 text-center py-6">
                <LuMicOff className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="text-sm text-warning font-medium">
                    Speech recognition is not supported in your browser.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Please use Google Chrome for the best experience.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Record Button */}
            <div className="flex items-center justify-center">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={disabled}
                    className={`
                        relative w-20 h-20 rounded-full flex items-center justify-center
                        transition-all duration-300 cursor-pointer
                        ${isRecording
                            ? 'bg-danger text-white animate-recording shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                            : 'bg-primary text-white hover:bg-primary-hover shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                        }
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={isRecording ? 'Stop recording' : 'Start recording'}
                >
                    {isRecording ? (
                        <LuCircle className="w-8 h-8 fill-current" />
                    ) : (
                        <LuMic className="w-8 h-8" />
                    )}
                </button>
            </div>

            {/* Status */}
            <p className="text-center text-sm text-muted-foreground">
                {isRecording ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                        Recording... Speak in French
                    </span>
                ) : disabled ? (
                    'Recording disabled'
                ) : (
                    'Click the microphone to start speaking'
                )}
            </p>

            {/* Live Transcript */}
            {(finalTranscript || interimTranscript) && (
                <div className="card animate-fade-in">
                    <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                        Live Transcript
                    </p>
                    <p className="text-sm leading-relaxed">
                        <span className="text-foreground">{finalTranscript}</span>
                        <span className="text-muted-foreground italic">{interimTranscript}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
