/**
 * True if this is a return visit within the current browser session.
 * On first call per session, sets the flag and returns false.
 * Subsequent calls (or navigations within the same tab) return true.
 */
export const isRevisit: boolean = (() => {
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('v')) return true;
    sessionStorage.setItem('v', '1');
  } catch {}
  return false;
})();
