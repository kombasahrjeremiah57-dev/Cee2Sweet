import { Suspense } from 'react';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export default function AdminLogin(){return <Suspense fallback={<div className="shell section"><div className="mx-auto h-80 max-w-md animate-pulse rounded-2xl bg-stone-200" /></div>}><AdminLoginForm /></Suspense>}
