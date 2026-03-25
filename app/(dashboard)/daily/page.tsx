import { LuCalendarClock, LuConstruction } from 'react-icons/lu';

export default function DailyTrainingPage() {
    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuCalendarClock className="w-7 h-7 text-amber-400" />
                    Daily Training
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    30-minute structured daily routine
                </p>
            </div>

            <div className="card text-center py-16">
                <LuConstruction className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Coming in Phase 6</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Guided daily routine: 10 min speaking → 10 min listening → 10 min review.
                    This module will be available after speaking and listening are complete.
                </p>
            </div>
        </div>
    );
}
