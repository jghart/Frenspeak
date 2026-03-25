import { LuMic, LuConstruction } from 'react-icons/lu';

export default function SpeakingPage() {
    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuMic className="w-7 h-7 text-primary" />
                    Speaking Practice
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Simulate TCF speaking tasks 1, 2, and 3
                </p>
            </div>

            <div className="card text-center py-16">
                <LuConstruction className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Coming in Phase 2</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    The speaking simulation module with Web Speech API integration, 
                    exam-style timers, and real-time feedback is being built next.
                </p>
            </div>
        </div>
    );
}
