'use client';

import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from './GoogleAnalytics';
import PageViewTracker from './PageViewTracker';

export default function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      <GoogleAnalytics />
      <PageViewTracker />
    </>
  );
} 