// Central app configuration (single source of truth for both main.tsx and showcase.tsx).
// Hardcoded to apex domain — www.videosync.ink redirects without CORS headers,
// which breaks the showcase fetch in the browser.
export const API_BASE = 'https://videosync.ink';
