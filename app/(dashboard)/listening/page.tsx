import { LuHeadphones, LuConstruction } from 'react-icons/lu';

export default function ListeningPage() {
    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuHeadphones className="w-7 h-7 text-violet-400" />
                    Listening Practice
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Practice with real-life French audio and MCQ questions
                </p>
            </div>

            <div className="card text-center py-16">
                <LuConstruction className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Coming in Phase 3</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    The listening practice module with one-play audio, MCQ interface,
                    and transcript reveal is planned for Phase 3.
                </p>
            </div>
        </div>
    );
}
