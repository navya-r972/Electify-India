'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function SignupContent() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page with signup=true parameter
    router.push('/login?signup=true');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-dark-900">
      <div className="text-center bg-white dark:bg-dark-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting to signup...</h1>
        <p>Please wait while we redirect you to the signup page.</p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-dark-900">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}