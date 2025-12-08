"use client";

import { useEffect } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.9382 0.104 96.09)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto" 
               style={{ borderColor: 'oklch(0.208 0.042 265.755)', borderTopColor: 'transparent' }}
          />
          <p className="mt-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
