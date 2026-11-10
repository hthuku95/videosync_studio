import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar, Toolbar, Container, Typography, Button, Stack, Chip, Paper,
  Box, Grid, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/SupportAgent';
import ShieldIcon from '@mui/icons-material/VerifiedUser';
import BoltIcon from '@mui/icons-material/Bolt';
import { studioTheme } from './theme';
import './styles.css';

const API_BASE = import.meta.env.VITE_VIDEOSYNC_API_BASE || 'https://www.videosync.ink';
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/videosync-support/30min';
const FREELANCE_LANDING_URL = import.meta.env.VITE_FREELANCE_LANDING_URL || 'https://www.peopleperhour.com/hourlie/create-10-professional-animation-videos-from-your-website-url/1138115/auto?ref=member';
const FREELANCE_EDUCATION_URL = import.meta.env.VITE_FREELANCE_EDUCATION_URL || 'https://www.peopleperhour.com/hourlie/create-10-educational-animation-videos-on-any-topic/1138113?ref=similar-hourlie';

type Service = {
  id: string;
  title: string;
  price: string;
  buyer: string;
  promise: string;
  deliverables: string[];
  freelanceUrl: string;
};

const services: Service[] = [
  {
    id: 'landing-page-dfy',
    title: 'Landing Page Video Pack (Done For You)',
    price: '$100 – $200',
    buyer: 'SaaS founders, business owners, consultants, marketers',
    promise:
      'Send us your website URL. We crawl it, learn your business, and deliver 10 to 30 animated videos (how-to, marketing, product demos, explainers, testimonials, brand stories) — fully produced and delivered to you. No work on your end.',
    deliverables: [
      '10 to 30 animated videos from your website',
      'Any video type: how-to, marketing, product demo, explainer, testimonial',
      'Generated from your site content (no templates)',
      'Downloadable delivery page with all videos',
      '15-min strategy call included',
    ],
    freelanceUrl: FREELANCE_LANDING_URL,
  },
  {
    id: 'education-dfy',
    title: 'Education Video Pack (Done For You)',
    price: '$100 – $200',
    buyer: 'Educators, course creators, edu-YouTubers, training teams',
    promise:
      'Describe your lesson topic. We produce 10 to 30 animated educational videos (math, science, coding, language, history, finance, and more) with equations, diagrams, code animations, data charts, motion graphics, VFX, 3D depth, and narration — fully produced and delivered to you.',
    deliverables: [
      '10 to 30 animated lesson videos',
      'Any subject: math, science, coding, language, history, finance',
      'Equations, diagrams, motion graphics, VFX, 3D depth',
      'Narration synced to visuals',
      'Downloadable delivery page with all videos',
      '15-min strategy call included',
    ],
    freelanceUrl: FREELANCE_EDUCATION_URL,
  },
];

const steps = [
  'Book a 15-minute call via Calendly to discuss your needs.',
  'We agree on scope (10–30 videos, type, style) and you pay a deposit via our freelance escrow link.',
  'We generate all videos internally and deliver a branded link with everything ready to download.',
  'You review, request revisions, and we finalize. Remaining balance released on completion.',
];

function ServiceCard({ svc }: { svc: Service }) {
  return (
    <Paper
      sx={{
        p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5,
        transition: 'border-color .2s',
        '&:hover': { borderColor: 'rgba(129,140,248,0.55)' },
      }}
    >
      <Chip label="Done for you" size="small" color="primary" sx={{ alignSelf: 'flex-start' }} />
      <Typography variant="h3" component="h3">{svc.title}</Typography>
      <Typography variant="h4" color="primary" fontWeight={800}>{svc.price}</Typography>
      <Typography variant="body2" component="div" sx={{ mb: 0.5 }}>
        For: {svc.buyer}
      </Typography>
      <Typography variant="body1">{svc.promise}</Typography>
      <List dense disablePadding sx={{ mt: 1 }}>
        {svc.deliverables.map((item) => (
          <ListItem key={item} disableGutters disablePadding sx={{ py: 0.25 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            variant="contained"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<PhoneIcon />}
            sx={{ flex: 1 }}
          >
            Book a 15-min call
          </Button>
          <Button
            variant="outlined"
            href={svc.freelanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ flex: 1 }}
          >
            Pay deposit &amp; start
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

function App() {
  const ref = new URLSearchParams(window.location.search).get('ref');
  if (ref) localStorage.setItem('vs_ref', ref);

  return (
    <ThemeProvider theme={studioTheme}>
      <CssBaseline />
      <Box component="main" sx={{ pb: 10 }}>
        <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(7,17,29,0.82)', backdropFilter: 'blur(14px)', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar sx={{ gap: 1 }}>
            <Typography variant="h6" component="a" href="/" sx={{ color: '#fff', textDecoration: 'none', fontWeight: 800, letterSpacing: '-0.02em', mr: 'auto' }}>
              VideoSync&nbsp;Studio
            </Typography>
            <Button color="inherit" href="#services" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>Services</Button>
            <Button color="inherit" href={`${API_BASE}/chat`}>Workspace</Button>
            <Button variant="contained" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </Button>
          </Toolbar>
        </AppBar>

        {/* HERO */}
        <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip label="Done-for-you video production" color="primary" variant="outlined" sx={{ mb: 2 }} />
              <Typography variant="h1" component="h1" gutterBottom>
                We produce the videos.
                <Box component="span" sx={{ display: 'block', color: 'text.secondary', fontWeight: 700 }}>
                  You deliver them to your audience.
                </Box>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 620 }}>
                VideoSync Studio is the done-for-you arm of VideoSync. Send us your website URL or lesson
                topic — we crawl, learn, and produce 10 to 30 animated videos tailored to your brand.
                No software to learn, no rendering to manage.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button variant="contained" size="large" href="#services">Choose a service</Button>
                <Button variant="outlined" size="large" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 15-min call
                </Button>
              </Stack>
              <Stack direction="row" spacing={2} useFlexGap sx={{ mt: 3, flexWrap: 'wrap' }}>
                {['Calendly booking', 'Freelance escrow payment', 'No account needed to book'].map((t) => (
                  <Chip key={t} icon={<ShieldIcon />} label={t} variant="outlined" size="small" />
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary">What you get</Typography>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {[
                    '10–30 fully produced animated videos',
                    'Equations, diagrams, charts, motion graphics, VFX',
                    '3D depth + narrated voiceover',
                    'Branded delivery link — forever yours',
                  ].map((t) => (
                    <Stack key={t} direction="row" spacing={1.5} alignItems="flex-start">
                      <BoltIcon color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                      <Typography variant="body1">{t}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  Market alternative: <strong>$500+ per video</strong> at traditional studios.
                  We sit in the practical middle — fast, affordable, premium enough to resell.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* SERVICES */}
        <Container maxWidth="lg" id="services" sx={{ py: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>Services</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
            Transparent, bundle-based pricing — you pay once, we produce everything, you keep the videos forever.
          </Typography>
          <Grid container spacing={3}>
            {services.map((svc) => (
              <Grid size={{ xs: 12, md: 6 }} key={svc.id}>
                <ServiceCard svc={svc} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* HOW IT WORKS */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 3 }}>How it works</Typography>
          <Paper sx={{ p: 3 }}>
            <List>
              {steps.map((s, i) => (
                <ListItem key={s} disableGutters sx={{ py: 1.25, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      minWidth: 34, height: 34, borderRadius: '50%', mr: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                      fontWeight: 800, color: '#fff',
                    }}
                  >
                    {i + 1}
                  </Box>
                  <ListItemText primary={s} primaryTypographyProps={{ variant: 'subtitle1' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>

        {/* CLOSING CTA */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', background: 'linear-gradient(160deg, rgba(99,102,241,0.22), rgba(56,189,248,0.10))' }}>
            <Typography variant="h2" component="h2" gutterBottom>
              Ready to have your videos produced for you?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Choose a pack above, or book a 15-minute call and let's scope it together.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button variant="contained" size="large" href="#services">View services</Button>
              <Button variant="outlined" size="large" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a 15-min call
              </Button>
            </Stack>
          </Paper>
        </Container>

        {/* FOOTER */}
        <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 4, mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            VideoSync Studio — AI-agent video production. Produce more content for less. No studio, no crew, no waiting.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <a href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</a> ·{' '}
            <a href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</a>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
