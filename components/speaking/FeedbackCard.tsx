'use client';

import {
    LuCircleCheck,
    LuCircleX,
    LuMessageSquare,
    LuSparkles,
    LuTarget,
    LuTrendingUp,
} from 'react-icons/lu';

interface FeedbackCardProps {
    score: number;
    wordCount: number;
    keywordsMatched: string[];
    keywordsMissed: string[];
    feedback: string[];
    level: 'A2' | 'B1' | 'B2';
    transcript: string;
}

export default function FeedbackCard({
    score,
    wordCount,
    keywordsMatched,
    keywordsMissed,
    feedback,
    level,
    transcript,
}: FeedbackCardProps) {
    const scoreColor =
        score >= 14 ? 'text-success' : score >= 8 ? 'text-warning' : 'text-danger';
    const levelColor =
        level === 'B2'
            ? 'badge-success'
            : level === 'B1'
                ? 'badge-warning'
                : 'badge-danger';

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Score Header */}
            <div className="card-glow">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            Your Score
                        </p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className={`text-4xl font-bold ${scoreColor}`}>
                                {score}
                            </span>
                            <span className="text-lg text-muted-foreground">/20</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Estimated Level</p>
                        <span className={`badge ${levelColor} text-sm`}>
                            {level}
                        </span>
                    </div>
                </div>

                {/* Score bar */}
                <div className="progress-bar !h-3 !rounded-full">
                    <div
                        className="progress-bar-fill !rounded-full"
                        style={{
                            width: `${(score / 20) * 100}%`,
                            background:
                                score >= 14
                                    ? 'var(--success)'
                                    : score >= 8
                                        ? 'var(--warning)'
                                        : 'var(--danger)',
                        }}
                    />
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center">
                        <LuMessageSquare className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-lg font-bold">{wordCount}</p>
                        <p className="text-[10px] text-muted-foreground">Words</p>
                    </div>
                    <div className="text-center">
                        <LuTarget className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-lg font-bold">{keywordsMatched.length}</p>
                        <p className="text-[10px] text-muted-foreground">Keywords Hit</p>
                    </div>
                    <div className="text-center">
                        <LuTrendingUp className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-lg font-bold">{score >= 14 ? 'Pass' : 'Needs Work'}</p>
                        <p className="text-[10px] text-muted-foreground">B2 Status</p>
                    </div>
                </div>
            </div>

            {/* Feedback Points */}
            <div className="card">
                <div className="flex items-center gap-2 mb-3">
                    <LuSparkles className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold">Feedback</h3>
                </div>
                <ul className="space-y-2">
                    {feedback.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keywordsMatched.length > 0 && (
                    <div className="card !border-success/20 bg-success/5">
                        <div className="flex items-center gap-2 mb-2">
                            <LuCircleCheck className="w-4 h-4 text-success" />
                            <h4 className="text-xs font-semibold text-success uppercase tracking-wider">
                                Keywords Used
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {keywordsMatched.map((kw) => (
                                <span key={kw} className="badge badge-success">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {keywordsMissed.length > 0 && (
                    <div className="card !border-danger/20 bg-danger/5">
                        <div className="flex items-center gap-2 mb-2">
                            <LuCircleX className="w-4 h-4 text-danger" />
                            <h4 className="text-xs font-semibold text-danger uppercase tracking-wider">
                                Keywords Missed
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {keywordsMissed.map((kw) => (
                                <span key={kw} className="badge badge-danger">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Transcript */}
            {transcript && (
                <div className="card">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Your Response
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/80 italic">
                        &ldquo;{transcript}&rdquo;
                    </p>
                </div>
            )}
        </div>
    );
}
