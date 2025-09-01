'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Google Analytics route change tracker for Next.js App Router.
 * Sends a GA4 config call on every pathname/searchParams change.
 */
export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaMeasurementId) return;

    const search = searchParams?.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    // Prefer the global gtag if available
    const gtag = (typeof window !== 'undefined' && (window as any).gtag) || undefined;
    if (gtag) {
      gtag('config', gaMeasurementId, {
        page_path: pagePath,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      return;
    }

    // Fallback to dataLayer if gtag is not yet defined
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push([
        'config',
        gaMeasurementId,
        {
          page_path: pagePath,
          page_location: typeof window !== 'undefined' ? window.location.href : undefined,
        },
      ]);
    }
  }, [pathname, searchParams]);

  return null;
}
