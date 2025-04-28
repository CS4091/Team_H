"use client";

import { ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';
import AuthHeader from '@/components/AuthHeader';
import { useSelectedLayoutSegment } from 'next/navigation';
import { UserContextProvider } from '../../contexts/UserContextProvider';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <UserContextProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Fixed header */}
        <header className="shrink-0">
          <AuthHeader />
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sticky side panel */}
          <aside className="shrink-0 sticky top-0 h-full">
            <SidePanel currentPage={segment} />
          </aside>

          {/* Scrollable main content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
}