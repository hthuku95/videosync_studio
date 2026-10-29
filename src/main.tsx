import React from 'react';
import { createRoot } from 'react-dom/client';
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
  accent: string;
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
    accent: '#3b82f6',
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
    accent: '#22c55e',
    freelanceUrl: FREELANCE_EDUCATION_URL,
  },
];

function ServiceCard({ svc }: { svc: Service }) {
  return (
    <article className="service-card" style={{ '--accent': svc.accent } as React.CSSProperties}>
      <div className="card-body">
        <div className="card-kicker">{svc.buyer}</div>
        <h3>{svc.title}</h3>
        <div className="card-price">{svc.price}</div>
        <p>{svc.promise}</p>
        <ul>
          {svc.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="card-actions">
        <a className="buy-button" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Book a 15-min call
        </a>
        <a className="buy-button usdc-button" href={svc.freelanceUrl} target="_blank" rel="noopener noreferrer">
          Pay deposit &amp; start
        </a>
      </div>
    </article>
  );
}

function App() {
  const ref = new URLSearchParams(window.location.search).get('ref');
  if (ref) localStorage.setItem('vs_ref', ref);

  return (
    <main>
      <nav className="topbar">
        <a href="/" className="brand">VideoSync Studio</a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a call</a>
          <a href={`${API_BASE}/chat`}>Workspace</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Done-for-you video production</div>
          <h1>We produce the videos. You deliver them to your audience.</h1>
          <p>
            VideoSync Studio is the done-for-you arm of VideoSync. Send us your website URL or lesson topic —
            we crawl, learn, and produce 10 to 30 animated videos tailored to your brand. No software to learn,
            no rendering to manage. Book a 15-minute call to get started.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#services">Choose a service</a>
            <a className="button secondary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a 15-min call
            </a>
          </div>
        </div>
        <div className="hero-board" aria-hidden="true">
          <div className="timeline-row wide" />
          <div className="timeline-row" />
          <div className="scene-tile" />
          <div className="waveform">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="pricing-note">
        <strong>Done-for-you pricing.</strong> You pay $100–$200 for 10–30 fully produced animated videos. Every type of animation: equations, diagrams, code animations, data charts, motion graphics, VFX, 3D depth, kinetic typography, and more.
        We handle everything — you get a delivery link with all videos ready to download and use.
        Market alternatives range from $500+ per video at traditional studios. We sit in the practical middle:
        fast, affordable, and premium enough to resell.
      </section>

      <section className="payment-methods-info">
        <span className="pill">Calendly booking</span>
        <span className="pill pill-usdc">Freelance escrow payment</span>
        <span className="pill">No account needed to book</span>
      </section>

      <section id="services" className="offer-grid">
        {services.map((svc) => (
          <ServiceCard key={svc.id} svc={svc} />
        ))}
      </section>

      <section className="pricing-note" style={{ marginTop: '2rem' }}>
        <strong>How it works.</strong>
        <ol style={{ margin: '0.8rem 0 0 1.2rem', lineHeight: 1.8, color: 'var(--muted)' }}>
          <li>Book a 15-minute call via Calendly to discuss your needs.</li>
          <li>We agree on scope (10–30 videos, type, style) and you pay a deposit via our freelance escrow link.</li>
          <li>We generate all videos internally and deliver a branded link with everything ready to download.</li>
          <li>You review, request revisions, and we finalize. Remaining balance released on completion.</li>
        </ol>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
