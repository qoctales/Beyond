/**
 * Utility for robust scrolling to top across all platforms,
 * especially mobile browsers (iOS Safari, Android Chrome) and iframes.
 */
export const scrollToSlideTop = () => {
  // Immediate scroll attempts
  try {
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  } catch (e) {
    // Ignore in restrictive environments
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }

  const anchor = document.getElementById('slide-top-anchor');
  if (anchor) {
    try {
      anchor.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
    } catch (e) {
      // Fallback
    }
  }

  // Animation frame
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (anchor) anchor.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  // Staggered timeouts to overcome mobile inertia/momentum scrolling
  const delays = [25, 60, 140, 260];
  delays.forEach((delay) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, delay);
  });
};
