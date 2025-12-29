'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-dark-900 overflow-hidden">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="min-h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
