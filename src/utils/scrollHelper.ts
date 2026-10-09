/**
 * Utility for robust scrolling to top across all platforms,
 * especially mobile browsers (iOS Safari, Android Chrome) and iframes.
 */
export const scrollToSlideTop = () => {
  try {
    window.scrollTo(0, 0);
  } catch (e) {
    // Ignore in restrictive environments
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });
  }

  // Staggered timeouts to overcome mobile momentum scrolling
  const delays = [30, 100];
  delays.forEach((delay) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }, delay);
  });
};
