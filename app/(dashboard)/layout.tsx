import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen">
            <Sidebar />
            <Header />
            <main
                className="pt-[var(--header-height)] min-h-screen"
                style={{ marginLeft: 'var(--sidebar-width)' }}
            >
                <div className="p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
