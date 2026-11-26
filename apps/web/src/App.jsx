import { useEffect, useState } from 'react';
import { ArrowUpRight, Braces, CheckCircle2, CircleHelp, Code2, Github, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from './lib/api.js';

function scrollToSection(event, sectionId) {
  event.preventDefault();
  const target = document.getElementById(sectionId);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Hash ko section id ke saath sync rakho, router-style #/path nahi.
  window.history.replaceState(null, '', `#${sectionId}`);
}

const pillars = [
  { icon: Code2, title: 'Real work, real proof', text: 'Build against practical briefs and show the decisions behind your code.' },
  { icon: Sparkles, title: 'Useful AI feedback', text: 'Get structured review and code-specific questions to sharpen your thinking.' },
  { icon: ShieldCheck, title: 'Evidence people can trust', text: 'Bring project, review, and assessment evidence together in one profile.' },
];

export default function App() {
  const [apiState, setApiState] = useState('checking');

  useEffect(() => {
    api.get('/health')
      .then(({ data }) => setApiState(data?.data?.status === 'ok' ? 'connected' : 'unavailable'))
      .catch(() => setApiState('unavailable'));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="site-header page-width">
        <a className="brand" href="#top" aria-label="DevKasauti home"><span className="brand-mark"><Braces size={19} /></span>devkasauti<span className="brand-period">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#why" onClick={(event) => scrollToSection(event, 'why')}>Why DevKasauti</a><a href="#workflow" onClick={(event) => scrollToSection(event, 'workflow')}>How it works</a><a href="#for-teams" onClick={(event) => scrollToSection(event, 'for-teams')}>For teams</a></nav>
        <a className="header-link" href="#workflow" onClick={(event) => scrollToSection(event, 'workflow')}>Get started <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero page-width" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE PROOF-BASED DEVELOPER PLATFORM</div>
          <h1>Don't just show<br />your skills. <span>Prove them.</span></h1>
          <p className="hero-description">Build real projects. Explain your decisions. Give every skill a story backed by work.</p>
          <div className="hero-actions"><a className="button-primary" href="#workflow" onClick={(event) => scrollToSection(event, 'workflow')}>Start proving your skills <ArrowUpRight size={17} /></a><a className="text-link" href="#why" onClick={(event) => scrollToSection(event, 'why')}>Explore the platform <span>↓</span></a></div>
          <div className="hero-note"><span className="avatar-stack"><i>A</i><i>R</i><i>K</i></span><span>Built for India's next generation of developers</span></div>
        </div>

        <div className="proof-card" aria-label="Illustration of a verified developer profile">
          <div className="card-topline"><span className="window-dots"><i /><i /><i /></span><span className="card-label">DEVELOPER PROOF</span><span className="live-indicator"><i /> LIVE</span></div>
          <div className="profile-row"><div className="profile-avatar">AK<span>✦</span></div><div><div className="profile-name">Aarav Kumar <span className="verified"><CheckCircle2 size={13} /></span></div><div className="profile-role">Full-stack developer · Jaipur</div></div><Github className="github-mark" size={19} /></div>
          <div className="score-panel"><div><span className="panel-caption">SKILL PROOF SCORE</span><div className="score-value">84<span>/100</span></div></div><div className="score-ring"><div><b>84</b><small>PROVEN</small></div></div></div>
          <div className="divider" />
          <div className="proof-list"><div className="proof-item"><span className="proof-icon indigo"><Code2 size={15} /></span><span><b>TaskFlow API</b><small>Challenge project · 12 commits</small></span><span className="proof-tag">REVIEWED</span></div><div className="proof-item"><span className="proof-icon cyan"><Sparkles size={15} /></span><span><b>Code understanding</b><small>AI Viva · strong reasoning</small></span><span className="proof-tag cyan-tag">VERIFIED</span></div></div>
          <div className="card-footer"><span><ShieldCheck size={14} /> Evidence-backed profile</span><span className="card-footer-arrow">↗</span></div>
          <div className="floating-chip"><span><CheckCircle2 size={14} /></span> Skill verified <b>+1</b></div>
        </div>
        <div className="hero-grid-label">01 <span /> PROOF OVER PROMISES</div>
      </section>

      <section className="trust-strip page-width" id="workflow"><span>ONE PLACE TO SHOW</span><div><Code2 size={15} /> Projects</div><i /><div><Sparkles size={15} /> Code reviews</div><i /><div><CircleHelp size={15} /> Viva assessments</div><i /><div><ShieldCheck size={15} /> Verified skills</div></section>

      <section className="why-section page-width" id="why"><div className="section-heading"><div className="eyebrow"><span className="eyebrow-dot" /> A BETTER SIGNAL</div><h2>Skills deserve <span>evidence.</span></h2><p>A resume tells people what you know. DevKasauti helps you show how you work.</p></div><div className="pillar-grid">{pillars.map(({ icon: Icon, title, text }, index) => <article className="pillar" key={title}><div className="pillar-top"><span className="pillar-icon"><Icon size={18} /></span><span className="pillar-index">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <footer className="site-footer page-width" id="for-teams"><a className="brand" href="#top"><span className="brand-mark"><Braces size={17} /></span>devkasauti<span className="brand-period">.</span></a><span>Proof over promises.</span><span className="api-status"><i className={apiState} /> API {apiState === 'checking' ? 'connecting' : apiState}</span></footer>
    </main>
  );
}
