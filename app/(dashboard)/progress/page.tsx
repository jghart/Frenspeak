import { LuChartBar, LuConstruction } from 'react-icons/lu';

export default function ProgressPage() {
    return (
        <div className="animate-fade-in space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <LuChartBar className="w-7 h-7 text-success" />
                    Progress
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Track your TCF preparation journey
                </p>
            </div>

            <div className="card text-center py-16">
                <LuConstruction className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Coming in Phase 5</h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Progress dashboard with streak calendar, accuracy charts,
                    weakness detection, and estimated level tracking.
                </p>
            </div>
        </div>
    );
}
