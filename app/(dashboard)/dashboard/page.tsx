import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import {
    LuMic,
    LuHeadphones,
    LuCalendarClock,
    LuFlame,
    LuClock,
    LuTarget,
    LuTrendingUp,
    LuChevronRight,
    LuGraduationCap,
    LuZap,
} from 'react-icons/lu';

const quickActions = [
    {
        href: '/speaking',
        icon: LuMic,
        title: 'Speaking Practice',
        description: 'Simulate TCF speaking tasks 1–3',
        gradient: 'from-blue-500/20 to-indigo-500/20',
        iconColor: 'text-blue-400',
        borderColor: 'hover:border-blue-500/30',
    },
    {
        href: '/listening',
        icon: LuHeadphones,
        title: 'Listening Practice',
        description: 'French audio MCQ exercises',
        gradient: 'from-violet-500/20 to-purple-500/20',
        iconColor: 'text-violet-400',
        borderColor: 'hover:border-violet-500/30',
    },
    {
        href: '/daily',
        icon: LuCalendarClock,
        title: 'Daily Training',
        description: '30 min structured routine',
        gradient: 'from-amber-500/20 to-orange-500/20',
        iconColor: 'text-amber-400',
        borderColor: 'hover:border-amber-500/30',
    },
    {
        href: '/exam',
        icon: LuGraduationCap,
        title: 'Exam Simulation',
        description: 'Full TCF mock exam',
        gradient: 'from-rose-500/20 to-pink-500/20',
        iconColor: 'text-rose-400',
        borderColor: 'hover:border-rose-500/30',
    },
];

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name || 'there';

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Greeting */}
            <div>
                <h1 className="text-2xl font-bold">
                    Bonjour, <span className="gradient-text">{userName}</span> 👋
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Ready for your daily TCF training session?
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <LuFlame className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Streak</p>
                        <p className="text-lg font-bold">0 <span className="text-xs font-normal text-muted-foreground">days</span></p>
                    </div>
                </div>

                <div className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LuClock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="text-lg font-bold">0 <span className="text-xs font-normal text-muted-foreground">/ 30 min</span></p>
                    </div>
                </div>

                <div className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <LuTarget className="w-5 h-5 text-success" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Tasks Done</p>
                        <p className="text-lg font-bold">0</p>
                    </div>
                </div>

                <div className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <LuTrendingUp className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Est. Level</p>
                        <p className="text-lg font-bold">A2</p>
                    </div>
                </div>
            </div>

            {/* Quick Start Suggestion */}
            <div className="card-glow bg-gradient-to-r from-primary/5 to-accent/5 !border-primary/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <LuZap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Start Daily Training</h3>
                            <p className="text-sm text-muted-foreground">
                                10 min speaking → 10 min listening → 10 min review
                            </p>
                        </div>
                    </div>
                    <Link href="/daily" className="btn btn-primary">
                        Begin <LuChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Practice Modules</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.href}
                                href={action.href}
                                className={`card-glow group ${action.borderColor}`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3`}>
                                    <Icon className={`w-6 h-6 ${action.iconColor}`} />
                                </div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {action.description}
                                </p>
                                <div className="flex items-center gap-1 mt-3 text-xs text-muted group-hover:text-primary transition-colors">
                                    Start practice <LuChevronRight className="w-3 h-3" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="card text-center py-12">
                    <p className="text-muted-foreground text-sm">
                        No activity yet. Start a practice session to see your progress here!
                    </p>
                </div>
            </div>
        </div>
    );
}
