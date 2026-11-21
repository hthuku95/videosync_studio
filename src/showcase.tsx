// src/showcase.tsx
// Marketing showcase for the DFY storefront (studio.videosync.ink).
// Fetches the public /api/showcase endpoint and renders a proof-of-work wall
// of real generated clips between the hero and services sections. DFY clients
// pay for the OUTCOME, so the wall shows finished results only — no AI
// framing, no internal gig slugs (owner directive Nov 11 2026).
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { API_BASE } from './config';

interface ShowcaseScene {
  kind: 'scene';
  url: string;
  source: string;
  theme: string;
  orientation: string;
  duration: number;
  title: string;
}

interface ShowcaseVideo {
  kind: 'video';
  url: string;
  title: string;
  gig_type: string;
  orientation: string;
  delivery: string;
}

let cached: { scenes: ShowcaseScene[]; videos: ShowcaseVideo[]; at: number } | null = null;
const TTL_MS = 5 * 60_000;

async function getShowcase(): Promise<{ scenes: ShowcaseScene[]; videos: ShowcaseVideo[] }> {
  if (cached && Date.now() - cached.at < TTL_MS) {
    return { scenes: cached.scenes, videos: cached.videos };
  }
  try {
    const res = await fetch(`${API_BASE}/api/showcase`);
    const d = await res.json();
    const out = { scenes: (d?.scenes ?? []) as ShowcaseScene[], videos: (d?.videos ?? []) as ShowcaseVideo[] };
    cached = { ...out, at: Date.now() };
    return out;
  } catch {
    return { scenes: [], videos: [] };
  }
}

/** Muted looping clip that plays only while on screen. */
function SceneClip({ src, portrait }: { src: string; portrait: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) el.play().catch(() => undefined);
    else el.pause();
  }, [visible]);

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'rgba(255,255,255,0.04)',
        border: '1px solid',
        borderColor: 'divider',
        aspectRatio: portrait ? '9 / 14' : '16 / 9',
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
        },
      }}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: 'rgba(11,11,20,0.55)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: 0.85,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </Box>
    </Box>
  );
}

/** Proof-of-work wall — renders nothing while the showcase is empty. */
export function ShowcaseStrip() {
  const [scenes, setScenes] = useState<ShowcaseScene[]>([]);

  useEffect(() => {
    let alive = true;
    getShowcase().then((d) => {
      if (!alive) return;
      const seen = new Set<string>();
      const unique = d.scenes.filter((s) => {
        if (!s?.url || seen.has(s.url)) return false;
        seen.add(s.url);
        return true;
      });
      const mixed = [...unique].sort((a, b) => {
        if (a.orientation !== b.orientation) return a.orientation === 'portrait' ? -1 : 1;
        return a.source.localeCompare(b.source);
      });
      setScenes(mixed.slice(0, 12));
    });
    return () => {
      alive = false;
    };
  }, []);

  if (scenes.length === 0) return null;

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Recent work
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
        A sample of videos produced end-to-end by our pipeline — brief, script, voiceover, animation, render.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
        }}
      >
        {scenes.map((s) => (
          <SceneClip key={s.url} src={s.url} portrait={s.orientation === 'portrait'} />
        ))}
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" size="large" href="#services">
          Get videos like these
        </Button>
      </Box>
    </Box>
  );
}

