'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LuLayoutDashboard,
    LuMic,
    LuHeadphones,
    LuCalendarClock,
    LuChartBar,
    LuGraduationCap,
    LuFlame,
} from 'react-icons/lu';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LuLayoutDashboard },
    { href: '/speaking', label: 'Speaking', icon: LuMic },
    { href: '/listening', label: 'Listening', icon: LuHeadphones },
    { href: '/daily', label: 'Daily Training', icon: LuCalendarClock },
    { href: '/progress', label: 'Progress', icon: LuChartBar },
    { href: '/exam', label: 'Exam Mode', icon: LuGraduationCap },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-surface border-r border-border"
            style={{ width: 'var(--sidebar-width)' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 border-b border-border"
                style={{ height: 'var(--header-height)' }}
            >
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight text-foreground">
                        Fren<span className="text-primary">Speak</span>
                    </h1>
                    <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                        TCF Trainer
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                                transition-all duration-200 group
                                ${isActive
                                    ? 'bg-primary-light text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                                }
                            `}
                        >
                            <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors
                                ${isActive ? 'text-primary' : 'text-muted group-hover:text-foreground'}
                            `} />
                            {item.label}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Streak Card */}
            <div className="px-3 pb-4">
                <div className="card p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <LuFlame className="w-5 h-5 text-warning streak-fire" />
                        <span className="text-sm font-semibold">Daily Streak</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-warning">0</span>
                        <span className="text-xs text-muted-foreground">days</span>
                    </div>
                    <div className="progress-bar mt-2">
                        <div className="progress-bar-fill" style={{ width: '0%' }} />
                    </div>
                    <p className="text-[11px] text-muted mt-1.5">
                        30 min goal · 0 min today
                    </p>
                </div>
            </div>
        </aside>
    );
}
