import { LuGraduationCap, LuConstruction } from 'react-icons/lu';

export default function ExamPage() {
    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuGraduationCap className="w-7 h-7 text-rose-400" />
                    TCF Exam Simulation
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Full realistic TCF exam simulation
                </p>
            </div>

            <div className="card text-center py-16">
                <LuConstruction className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Coming in Phase 7</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Complete TCF simulation: 12-minute speaking session with real timing,
                    fixed listening question set, and comprehensive exam result summary.
                </p>
            </div>
        </div>
    );
}
