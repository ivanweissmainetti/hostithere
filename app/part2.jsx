// ========== PART 2: How It Works (sticky phone) + Circles Builder ==========
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

function PhoneStatus() {
  return (
    <div className="status">
      <span>14:22</span>
      <span className="r">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx=".5"/><rect x="4" y="4" width="3" height="6" rx=".5"/><rect x="8" y="2" width="3" height="8" rx=".5"/><rect x="12" y="0" width="3" height="10" rx=".5"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor"><path d="M1 4 Q7 -1 13 4 M3 6 Q7 2 11 6 M5 8 Q7 6 9 8" strokeWidth="1" fill="none"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor"><rect x="0.5" y="0.5" width="18" height="9" rx="2"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" rx=".5" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

function HowItWorks() {
  const [active, setActive] = useState2(0);
  const stepRefs = useRef2([]);

  useEffect2(() => {
    const handler = () => {
      const vh = window.innerHeight;
      let best = 0; let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - vh * 0.5);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const steps = [
    { t: 'Build your circles', d: 'Group friends how they actually live in your life: coffee people, gym people, the Thursday-night crew. Circles are private to you.',  view: 0, visible: false },
    { t: 'Get a quiet nudge',  d: 'When a friend from one of your circles is near a spot you love, you get one notification. No feed, no chatter. Just a gentle heads-up.',     view: 1, visible: true  },
    { t: 'Meet, in real life', d: 'Tap "I\'m in" or swipe it away. No awkward group chat, no location broadcast. Just the possibility of seeing a friend before the day gets away.', view: 2, visible: true  },
  ];

  const visibleSteps = steps.filter(s => s.visible);
  const total = String(visibleSteps.length).padStart(2, '0');
  const activeView = visibleSteps[active]?.view ?? visibleSteps[0]?.view ?? 1;

  return (
    <section className="how" id="how">
      <div className="wrap" style={{marginBottom:48}}>
        <span className="eyebrow">How it works · 02</span>
        <h2 className="serif" style={{fontSize:'clamp(40px,5.5vw,72px)',marginTop:20,maxWidth:780,lineHeight:1}}>
          From <em className="serif-it" style={{color:'var(--ember)'}}>"maybe"</em> to <em className="serif-it" style={{color:'var(--ember)'}}>"see you in ten."</em>
        </h2>
      </div>
      <div className="wrap how-grid">
        <div className="how-steps">
          {visibleSteps.map((s, i) => (
            <div
              key={i}
              ref={el => stepRefs.current[i] = el}
              className={`step ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="step-num"><b>{String(i + 1).padStart(2, '0')}</b> / {total} · step</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="how-sticky">
          <div className="phone">
            <div className="phone-screen">
              <PhoneStatus />
              <View0 active={activeView === 0} />
              <View1 active={activeView === 1} />
              <View2 active={activeView === 2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function View0({ active }) {
  return (
    <div className={`view ${active ? 'active' : ''}`}>
      <div className="v-head">
        <h4>Your circles</h4>
        <div className="plus">+</div>
      </div>
      <div className="c-tile">
        <div className="c-ic ember">☕</div>
        <div>
          <div className="c-name">Coffee people</div>
          <div className="c-sub">4 friends · Flagey / Sablon</div>
        </div>
        <div className="c-count">on</div>
      </div>
      <div className="c-tile">
        <div className="c-ic dusk">📚</div>
        <div>
          <div className="c-name">Study friends</div>
          <div className="c-sub">7 friends · ULB / libraries</div>
        </div>
        <div className="c-count">on</div>
      </div>
      <div className="c-tile">
        <div className="c-ic sage">🏃</div>
        <div>
          <div className="c-name">Gym buddies</div>
          <div className="c-sub">3 friends · weekdays 7–10</div>
        </div>
        <div className="c-count">on</div>
      </div>
      <div className="c-tile">
        <div className="c-ic plum">🌙</div>
        <div>
          <div className="c-name">Thursday crew</div>
          <div className="c-sub">6 friends · evenings only</div>
        </div>
        <div className="c-count">off</div>
      </div>
    </div>
  );
}

function View1({ active }) {
  return (
    <div className={`view ${active ? 'active' : ''}`} style={{padding:0}}>
      <div className="v-map">
        <svg className="map-svg" viewBox="0 0 300 560" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(245,240,232,.2)" fill="none" strokeWidth="1">
            <path d="M0 180 Q 80 140 160 180 T 320 180" />
            <path d="M0 260 Q 100 300 200 260 T 400 260" />
            <path d="M0 340 Q 60 380 140 340 T 300 340" />
            <path d="M0 420 Q 120 380 240 420 T 400 420" />
            <path d="M90 0 Q 140 100 90 200 T 90 400" />
            <path d="M210 40 Q 240 160 210 280 T 210 480" />
          </g>
        </svg>
        <div className="map-banner">
          <span className="dot"></span>
          <div className="t"><b>Léa</b> at Café Belga<br/><span style={{color:'var(--mute-dark)',fontSize:10,fontFamily:'JetBrains Mono, monospace'}}>coffee circle · 6 min walk</span></div>
          <span className="go">GO →</span>
        </div>
        <div className="map-center"></div>
        <div className="friend-pin" style={{top:'30%', left:'18%'}}>L</div>
        <div className="friend-pin dusk" style={{top:'45%', left:'72%'}}>S</div>
        <div className="friend-pin sage" style={{top:'72%', left:'30%'}}>M</div>
      </div>
    </div>
  );
}

function View2({ active }) {
  return (
    <div className={`view ${active ? 'active' : ''}`} style={{padding:0}}>
      <div style={{position:'absolute',inset:'44px 0 0 0',background:'linear-gradient(180deg,#1a1a1e,#0a0a0c)'}}>
        <div style={{padding:'40px 22px 0',textAlign:'center'}}>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,letterSpacing:'.15em',color:'var(--ember)',textTransform:'uppercase',marginBottom:14}}>Moment · now</div>
          <div style={{fontFamily:'Instrument Serif,serif',fontSize:28,lineHeight:1.1,letterSpacing:'-.02em',marginBottom:10}}>Léa is at Café Belga</div>
          <div style={{fontSize:13,color:'var(--mute-dark)',lineHeight:1.4}}>6 min walk from you.<br/>Up for a quick coffee before your 15:00?</div>
        </div>
        <div className="v-sheet" style={{bottom:24}}>
          <div className="meta">coffee circle · 14:22</div>
          <h5>Join Léa?</h5>
          <div className="who">
            <div className="av av-e" style={{width:30,height:30,borderRadius:'50%',border:'2px solid #0e1117'}}></div>
            <div className="av av-d" style={{width:30,height:30,borderRadius:'50%',border:'2px solid #0e1117',marginLeft:-8}}></div>
            <div className="more">& 1 more nearby</div>
          </div>
          <div className="actions">
            <button className="no">later</button>
            <button className="yes">I'm in ↗</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======== CIRCLES BUILDER ========
const CIRCLE_LIB = [
  { id:'coffee', ic:'☕', name:'Coffee people', sub:'spontaneous mornings', tone:'ember' },
  { id:'study', ic:'📚', name:'Study friends', sub:'library co-working', tone:'dusk' },
  { id:'gym', ic:'🏃', name:'Gym buddies', sub:'weekday energy', tone:'sage' },
  { id:'night', ic:'🌙', name:'Thursday crew', sub:'evenings only', tone:'plum' },
  { id:'music', ic:'🎧', name:'Gig friends', sub:'shared playlists', tone:'ember' },
  { id:'food', ic:'🍜', name:'Food adventures', sub:'new spots', tone:'dusk' },
];

function CirclesBuilder() {
  const [selected, setSelected] = useState2(['coffee','study','gym']);
  const [notif, setNotif] = useState2(true);
  const [quiet, setQuiet] = useState2(true);
  const [radius, setRadius] = useState2(1.2);
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  const focus = selected.map(id => CIRCLE_LIB.find(c=>c.id===id)?.name).filter(Boolean);

  return (
    <section className="circles" id="circles">
      <div className="wrap">
        <Reveal className="head">
          <div>
            <span className="eyebrow">Circles · 03</span>
            <h2 style={{marginTop:16}}>Your circles,<br/><em>your</em> rules.</h2>
          </div>
          <p className="sub">Different friends for different parts of your life. Tell Junto who matters when, and it stays quiet the rest of the time.</p>
        </Reveal>

        <div className="builder">
          <Reveal className="cards-stage" delay={1}>
            <div className="stage-head">
              <h3>Pick your circles</h3>
              <span className="counter">{selected.length} active · tap to toggle</span>
            </div>
            <div className="circle-cards">
              {CIRCLE_LIB.map(c => (
                <div key={c.id} className={`cc ${selected.includes(c.id) ? 'on' : ''}`} onClick={()=>toggle(c.id)}>
                  <div className={`ic ${c.tone}`}>{c.ic}</div>
                  <h4>{c.name}</h4>
                  <div className="cc-sub">{c.sub}</div>
                  <div className="check">{selected.includes(c.id) ? '✓' : ''}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="rules" delay={2}>
            <div>
              <span className="eyebrow" style={{color:'var(--mute-dark)'}}>Rules · live preview</span>
              <h4 style={{marginTop:14}}>Notification rules</h4>
              <p className="desc">Shape how Junto pings you. You can break these rules per-circle later.</p>
              <div className="rule">
                <div className="lbl">Nearby friends<span className="sub">from selected circles only</span></div>
                <div className={`toggle ${notif ? 'on' : ''}`} onClick={()=>setNotif(!notif)}></div>
              </div>
              <div className="rule">
                <div className="lbl">Quiet hours<span className="sub">23:00 – 08:00 · no pings</span></div>
                <div className={`toggle ${quiet ? 'on' : ''}`} onClick={()=>setQuiet(!quiet)}></div>
              </div>
              <div className="slider-row">
                <div className="lbl">Nearby radius <span className="v">{radius.toFixed(1)} km</span></div>
                <input type="range" min="0.2" max="5" step="0.1" value={radius} onChange={e=>setRadius(+e.target.value)} className="slider" />
              </div>
            </div>
            <div className="preview">
              You'll be notified when friends from{' '}
              <em>{focus.length ? focus.slice(0,2).join(', ') + (focus.length > 2 ? ` +${focus.length-2} more` : '') : 'no circles'}</em>
              {' '}are within <em>{radius.toFixed(1)} km</em>{quiet ? ', except between 23:00–08:00.' : '.'}
              {!notif && ' Currently paused.'}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks, CirclesBuilder });
