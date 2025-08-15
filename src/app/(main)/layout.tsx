'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    // Build full query string
    const queryString = searchParams.toString();

    // Construct deep link
    const schemeUrl = `rn-universal-links-test.vercel.app://${pathname}${
      queryString ? `?${queryString}` : ''
    }`;

    // Redirect to custom scheme
    window.location.href = schemeUrl;

    // Optional fallback if app not installed
    const fallbackTimer = setTimeout(() => {
      window.location.href =
        'https://rn-universal-links-test.vercel.app/fallback';
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [pathname, searchParams]);

  return children;
};

export default MainLayout;
