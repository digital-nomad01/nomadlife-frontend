'use client';

import { useEffect } from 'react';

interface PageTrackerProps {
  pageType: 'homepage' | 'workspace' | 'space' | 'event' | 'bike-rental';
  pageData?: {
    id?: string;
    name?: string;
    location?: string;
    category?: string;
    slug?: string;
  };
}

export default function PageTracker({ pageType, pageData }: PageTrackerProps) {
  useEffect(() => {
    // Send page-specific event to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const gtag = (window as any).gtag;
      // Send a page-specific event based on the page type
      switch (pageType) {
        case 'homepage':
          gtag('event', 'page_view_homepage', {
            event_category: 'navigation',
            event_label: 'homepage_visit',
          });
          break;

        case 'workspace':
          gtag('event', 'page_view_workspace', {
            event_category: 'navigation',
            event_label: pageData?.name || 'unknown_workspace',
            workspace_id: pageData?.id,
            workspace_slug: pageData?.slug,
            workspace_location: pageData?.location,
          });
          break;

        case 'space':
          gtag('event', 'page_view_space', {
            event_category: 'navigation',
            event_label: pageData?.name || 'unknown_space',
            space_id: pageData?.id,
            space_category: pageData?.category,
            space_location: pageData?.location,
          });
          break;

        case 'event':
          gtag('event', 'page_view_event', {
            event_category: 'navigation',
            event_label: pageData?.name || 'unknown_event',
            event_id: pageData?.id,
            event_location: pageData?.location,
          });
          break;

        case 'bike-rental':
          gtag('event', 'page_view_bike_rental', {
            event_category: 'navigation',
            event_label: 'bike_rental_page',
            page_category: pageData?.category,
          });
          break;
      }

      // Also send a general page engagement event
      gtag('event', 'page_engagement', {
        event_category: 'engagement',
        page_type: pageType,
        page_id: pageData?.id || 'unknown',
      });
    }
  }, [pageType, pageData]);

  return null;
}
