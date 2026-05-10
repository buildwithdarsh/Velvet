'use client';

import { useEffect, useState } from 'react';
import { PageLoader } from './PageLoader';

const MIN_DISPLAY_MS = 3000;

/**
 * Shows the PageLoader for at least 3 seconds on initial page load / refresh.
 * After that, fades out smoothly and unmounts.
 */
export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      // Allow fade-out animation to finish before unmounting
      setTimeout(() => setVisible(false), 500);
    }, MIN_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <PageLoader />
    </div>
  );
}
