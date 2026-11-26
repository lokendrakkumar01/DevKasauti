import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Braces, CheckCircle2, CircleHelp, Code2, Github, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from './lib/api.js';

const pillars = [
  { icon: Code2, title: 'Real work, real proof', text: 'Build against practical briefs and show the decisions behind your code.' },
  { icon: Sparkles, title: 'Useful AI feedback', text: 'Get structured review and code-specific questions to sharpen your thinking.' },
  { icon: ShieldCheck, title: 'Evidence people can trust', text: 'Bring project, review, and assessment evidence together in one profile.' },
];

const steps = [
  { title: 'Choose a practical brief', text: 'Pick a development challenge that matches the skills you want to demonstrate.' },
  { title: 'Build and share your work', text: 'Connect a repository and submit the work for review when submissions are enabled.' },
  { title: 'Show evidence of your skills', text: 'Bring project work, feedback, and assessments together in a proof profile.' },
];

const audiences = [
  { title: 'Students', text: 'Build a stronger portfolio from practical development work.' },
  { title: 'Recruiters', text: 'Explore candidate evidence alongside skills and project history.' },
  { title: 'Colleges and mentors', text: 'Support learners with reviews and progress visibility.' },
];

export default function App() {
  const [apiState, setApiState] = useState('checking');

  const checkApi = useCallback(async () => {
    setApiState('checking');
    try {
      const { data } = await api.get('/health');
      setApiState(data?.data?.status === 'ok' ? 'connected' : 'unavailable');
    } catch {
      setApiState('unavailable');
    }
  }, []);

  useEffect(() => {
    void checkApi();
  }, [checkApi]);

  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="site-header page-width">
        <a className="brand" href="#top" aria-label="DevKasauti home"><span className="brand-mark"><Braces size={19} /></span>devkasauti<span className="brand-period">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#why">Why DevKasauti</a>
          <a href="#workflow">How it works</a>
          <a href="#for-teams">For teams</a>
        </nav>
        <a className="header-link" href="#get-started">Get started <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero page-width" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE PROOF-BASED DEVELOPER PLATFORM</div>
          <h1>Don't just show<br />your skills. <span>Prove them.</span></h1>
          <p className="hero-description">Build real projects. Explain your decisions. Give every skill a story backed by work.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#get-started">Start proving your skills <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#why">Explore the platform <span>↓</span></a>
          </div>
          <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>A</i><i>R</i><i>K</i></span><span>Built for India's next generation of developers</span></div>
        </div>

        <div className="proof-card" aria-label="Illustrative preview, not a live developer profile">
          <div className="card-topline"><span className="window-dots"><i /><i /><i /></span><span className="card-label">PROFILE DESIGN PREVIEW</span><span className="card-label">SAMPLE</span></div>
          <div className="profile-row"><div className="profile-avatar">SD</div><div><div className="profile-name">Sample Developer</div><div className="profile-role">Illustrative profile · no live account</div></div><Github className="github-mark" size={19} aria-hidden="true" /></div>
          <div className="score-panel"><div><span className="panel-caption">SKILL PROOF SCORE</span><div className="score-value">—<span>/100</span></div></div><span className="proof-tag">PREVIEW ONLY</span></div>
          <div className="divider" />
          <div className="proof-list">
            <div className="proof-item"><span className="proof-icon indigo"><Code2 size={15} /></span><span><b>Example project</b><small>Sample content · not submitted</small></span><span className="proof-tag">SAMPLE</span></div>
            <div className="proof-item"><span className="proof-icon cyan"><Sparkles size={15} /></span><span><b>Code understanding</b><small>Assessment preview</small></span><span className="proof-tag cyan-tag">PREVIEW</span></div>
          </div>
          <div className="card-footer"><span><ShieldCheck size={14} /> Illustrative design only</span><span className="card-footer-arrow" aria-hidden="true">↗</span></div>
        </div>
        <div className="hero-grid-label">01 <span /> PROOF OVER PROMISES</div>
      </section>

      <section className="why-section page-width" id="workflow">
        <div className="section-heading"><div className="eyebrow"><span className="eyebrow-dot" /> PLANNED WORKFLOW</div><h2>From project to <span>proof.</span></h2><p>This is the intended workflow. Submissions and accounts are not enabled in this preview yet.</p></div>
        <div className="pillar-grid">{steps.map((step, index) => <article className="pillar" key={step.title}><div className="pillar-top"><span className="pillar-icon"><Code2 size={18} /></span><span className="pillar-index">0{index + 1}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="why-section page-width" id="why">
        <div className="section-heading"><div className="eyebrow"><span className="eyebrow-dot" /> A BETTER SIGNAL</div><h2>Skills deserve <span>evidence.</span></h2><p>A resume tells people what you know. DevKasauti helps you show how you work.</p></div>
        <div className="pillar-grid">{pillars.map(({ icon: Icon, title, text }, index) => <article className="pillar" key={title}><div className="pillar-top"><span className="pillar-icon"><Icon size={18} /></span><span className="pillar-index">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="why-section page-width" id="for-teams">
        <div className="section-heading"><div className="eyebrow"><span className="eyebrow-dot" /> BUILT FOR THE ECOSYSTEM</div><h2>One platform, <span>shared proof.</span></h2><p>These product areas are planned; team accounts and dashboards are not active in this preview.</p></div>
        <div className="pillar-grid">{audiences.map((audience, index) => <article className="pillar" key={audience.title}><div className="pillar-top"><span className="pillar-icon"><ShieldCheck size={18} /></span><span className="pillar-index">0{index + 1}</span></div><h3>{audience.title}</h3><p>{audience.text}</p></article>)}</div>
      </section>

      <section className="why-section page-width" id="get-started">
        <div className="section-heading"><div className="eyebrow"><span className="eyebrow-dot" /> EARLY PREVIEW</div><h2>Ready to get <span>started?</span></h2><p>Registration, challenge submissions, and dashboards are not enabled yet. This deployment currently demonstrates the landing page and API health connection.</p></div>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <button className="button-primary" type="button" onClick={() => void checkApi()} disabled={apiState === 'checking'} aria-live="polite">
            <RefreshCw size={16} className={apiState === 'checking' ? 'animate-spin' : ''} />
            {apiState === 'checking' ? 'Checking API…' : apiState === 'connected' ? 'API connected · Check again' : 'API unavailable · Retry'}
          </button>
          <a className="text-link" href="#top">Back to top ↑</a>
        </div>
      </section>

      <footer className="site-footer page-width"><a className="brand" href="#top"><span className="brand-mark"><Braces size={17} /></span>devkasauti<span className="brand-period">.</span></a><span>Proof over promises.</span><span className="api-status"><i className={apiState} /> API {apiState}</span></footer>
    </main>
  );
}
