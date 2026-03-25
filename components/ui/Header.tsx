'use client';

import { useSession, signOut } from 'next-auth/react';
import { LuLogOut, LuUser, LuTarget } from 'react-icons/lu';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header
            className="fixed top-0 right-0 z-30 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border"
            style={{
                left: 'var(--sidebar-width)',
                height: 'var(--header-height)',
            }}
        >
            {/* Left: Page context */}
            <div className="flex items-center gap-3">
                <div className="badge badge-primary">
                    <LuTarget className="w-3 h-3" />
                    TCF B2
                </div>
                <span className="text-xs text-muted-foreground">
                    30 min/day training
                </span>
            </div>

            {/* Right: User */}
            <div className="flex items-center gap-4">
                {session?.user && (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                <LuUser className="w-4 h-4 text-primary" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-foreground leading-none">
                                    {session.user.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {session.user.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="btn btn-ghost !px-2.5 !py-2"
                            title="Sign out"
                        >
                            <LuLogOut className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
