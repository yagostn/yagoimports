"use client";

import { ReactNode } from 'react';
import { AdminNavLinks } from './admin-nav-links';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.02 96)' }}>
      <div className="flex h-screen">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex md:flex-col w-64 border-r" 
               style={{ 
                 backgroundColor: 'oklch(0.9382 0.104 96.09)',
                 borderColor: 'oklch(0.929 0.013 255.508)'
               }}>
          <AdminNavLinks />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
