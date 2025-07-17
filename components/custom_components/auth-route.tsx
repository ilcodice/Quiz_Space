'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signup-login');
    }
  }, []);

  return <>{children}</>;
}