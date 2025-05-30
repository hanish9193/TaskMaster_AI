
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InitialRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to the dashboard page
    router.replace('/dashboard');
  }, [router]);

  // Render nothing or a minimal loading indicator while redirecting
  // For an immediate redirect, often nothing is needed here,
  // or a very simple "Redirecting..." message.
  // To avoid a flash of content, returning null is common.
  return null;
}
