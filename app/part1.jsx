// ========== JUNTO COMPONENTS — PART 1: primitives + hero + value ==========
const { useState, useEffect, useRef, useMemo } = React;

// Reveal on scroll
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${delay ? 'd'+delay : ''} ${className}`} {...rest}>{children}</Tag>;
}

// Nav — switches to "on-light" when over light sections
function Nav() {
  const [onLight, setOnLight] = useState(false);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 40;
      const lightSecs = document.querySelectorAll('.section-light, .section-paper');
      let over = false;
      lightSecs.forEach(s => {
        const r = s.getBoundingClientRect();
        const top = window.scrollY + r.top;
        const bot = top + r.height;
        if (y >= top && y <= bot) over = true;
      });
      setOnLight(over);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <nav className={`nav ${onLight ? 'on-light' : ''}`}>
      <a href="#top" className="brand">
        <span className="dot"></span>Junto
      </a>
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#circles">Circles</a>
        <a href="#privacy">Privacy</a>
        <a href="#faq">FAQ</a>
        <a href="#waitlist" className="nav-cta">Join waitlist <span className="arr">↗</span></a>
      </div>
    </nav>
  );
}

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <section className={`hero ${ready ? 'ready' : ''}`} id="top">
      <div className="hero-grid"></div>
      <div className="hero-noise"></div>
      <div className="wrap hero-inner">
        <div>
          <div className="hero-meta">
            <span className="pill"><span className="ping"></span>Alpha · Brussels · 2026</span>
            <span className="pill" style={{color:'var(--mute-dark)'}}>ios & android</span>
          </div>
          <h1>
            <span className="line"><span>One notification,</span></span>
            <span className="line"><span><em>countless</em> memories.</span></span>
          </h1>
          <p className="lede">
            Junto is the social app that turns "we should hang out" into an
            actual walk to the corner café. Meet friends nearby — without
            group-chat fatigue, constant tracking, or the feeling you've been
            scrolling too long.
          </p>
          <div className="hero-ctas">
            <a href="#waitlist" className="btn btn-primary">Join the waitlist <span className="arr">↗</span></a>
            <a href="#how" className="btn btn-ghost">See how it works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="notif n1">
            <div className="av"></div>
            <div>
              <div className="t"><b>Léa</b> just got to Café Belga — <b>6 min walk</b>.</div>
              <div className="s">coffee circle · 14:22</div>
            </div>
          </div>
          <div className="notif n2 blue">
            <div className="av"></div>
            <div>
              <div className="t"><b>3 study friends</b> at BoZar library now.</div>
              <div className="s">study circle · 16:08</div>
            </div>
          </div>
          <div className="notif n3 sage">
            <div className="av"></div>
            <div>
              <div className="t"><b>Sam</b> is around Flagey, up for a beer?</div>
              <div className="s">evening circle · 19:41</div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap hero-foot">
        <span>Brussels · est. 2026 · no feed, no chats, no noise</span>
        <span className="scroll">scroll <span className="bar"></span></span>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    'One notification, countless memories',
    'Spontaneous, not scheduled',
    'Your circles, your rules',
    'Be present, not online',
    'Catch up in real life',
    'Privacy is a feature, not a footnote',
  ];
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((t,i) => (
          <span key={i}><em>{t}</em><span className="dot"></span></span>
        ))}
      </div>
    </div>
  );
}

// Value prop — progressively highlight words on scroll
function ValueProp() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - Math.max(0, Math.min(1, (r.top + r.height * 0.2) / vh));
      setProgress(p);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const words = [
    {t:'Junto helps you ', em:false},
    {t:'seize', em:'ember', big:true},
    {t:' the opportunity to ', em:false},
    {t:'meet', em:'ember', big:true},
    {t:' friends nearby. You\'re always ', em:false},
    {t:'one', em:'dusk', big:true},
    {t:' notification away from a great time.', em:false},
  ];
  return (
    <section className="value" ref={ref}>
      <div className="wrap">
        <span className="eyebrow" style={{marginBottom:32,display:'inline-flex'}}>Promise · 01</span>
        <h2>
          {words.map((w,i) => {
            const threshold = i / words.length;
            const on = progress > threshold;
            if (w.em) {
              return <em key={i} className={w.em === 'dusk' ? 'b' : ''}>{w.t}</em>;
            }
            return <span key={i} className={`w ${on ? 'on' : ''}`}>{w.t}</span>;
          })}
        </h2>
      </div>
    </section>
  );
}

Object.assign(window, { Reveal, Nav, Hero, Marquee, ValueProp });
