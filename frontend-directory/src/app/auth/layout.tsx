'use client';

import { ReactNode } from 'react';
import SidePanel from '@/components/SidePanel';
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
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="shrink-0 sticky top-0 h-full w-64 z-10">
            <SidePanel currentPage={segment} />
          </aside>

          {/* Main content pulled left under the sidebar by 2rem */}
          <main className="flex-1 overflow-y-auto -ml-8">
            {children}
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
}
