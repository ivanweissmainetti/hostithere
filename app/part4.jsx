// ========== PART 4: Waitlist, FAQ, Report, Footer ==========

// endpoint URLs preserved from original site — edit as needed
const WAITLIST_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzDPqhAwREUQdb4wig4LujEDJF-4oNNP9BeDTO5HbOZcOkvw2lxh92BvGaKBIKsx9bFcQ/exec';
const COMPLAINT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbw301-uJjWpEyRMWnHYD5GKcw4P1LeGUpD_RlCgjOKPlaTcP7Zct-weU3BrKlobWXHa/exec';

function Waitlist() {
  const [step, setStep] = React.useState(0);
  const [device, setDevice] = React.useState('');
  const [done, setDone] = React.useState(false);
  const formRef = React.useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector('.btn-full');
    btn.disabled = true;
    btn.textContent = 'Joining…';
    const data = {
      fullName: f.fullName.value,
      email: f.email.value,
      device,
      university: f.university.value,
      city: f.city.value,
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(WAITLIST_SHEET_URL, {
        method:'POST', mode:'no-cors',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data),
      });
    } catch {}
    setDone(true);
  };

  return (
    <section className="waitlist" id="waitlist">
      <div className="wrap wl-grid">
        <Reveal className="wl-left">
          <span className="eyebrow">Waitlist · 08</span>
          <h2 style={{marginTop:16}}>Be <em>early</em> in Brussels.</h2>
          <p className="lede">We're opening Junto up campus by campus. Early members shape the circles, the rules, and the first real-life meet-ups. No spam. Just the invite.</p>
          <div className="wl-meta">
            <div className="row"><span className="k">First drop</span><span className="v">Brussels universities · Spring 2026</span></div>
            <div className="row"><span className="k">Platforms</span><span className="v">iOS (TestFlight) · Android (closed beta)</span></div>
            <div className="row"><span className="k">Privacy</span><span className="v">Your email is only used for your invite and launch updates.</span></div>
            <div className="row"><span className="k">Spots</span><span className="v" style={{color:'var(--ember)'}}>312 of 500 claimed · alpha cohort</span></div>
          </div>
        </Reveal>

        <Reveal className="wl-card" delay={1}>
          {done ? (
            <div className="success">
              <div className="big">You're in.</div>
              <p>We'll email you when Junto opens at your campus. Tell a friend. Circles work better when yours is already on the list.</p>
              <span className="code">ALPHA · BRU · {new Date().getFullYear()}</span>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit}>
              <div className="stepdots">
                <div className={`s ${step>=0?'on':''}`}></div>
                <div className={`s ${step>=1?'on':''}`}></div>
                <div className={`s ${step>=2?'on':''}`}></div>
              </div>
              <div className="fgrp">
                <label>Full name</label>
                <input type="text" name="fullName" placeholder="Alex Example" required onFocus={()=>setStep(Math.max(step,0))} />
              </div>
              <div className="fgrp">
                <label>Email</label>
                <input type="email" name="email" placeholder="you@university.be" required onFocus={()=>setStep(Math.max(step,1))} />
              </div>
              <div className="fgrp">
                <label>Device</label>
                <div className="choices">
                  <label className={`choice ${device==='iOS'?'on':''}`}>
                    <input type="radio" name="device" value="iOS" checked={device==='iOS'} onChange={()=>{setDevice('iOS');setStep(Math.max(step,2));}} required />
                    <span className="lbl">iOS</span>
                  </label>
                  <label className={`choice ${device==='Android'?'on':''}`}>
                    <input type="radio" name="device" value="Android" checked={device==='Android'} onChange={()=>{setDevice('Android');setStep(Math.max(step,2));}} />
                    <span className="lbl">Android</span>
                  </label>
                </div>
              </div>
              <div className="frow">
                <div className="fgrp">
                  <label>University</label>
                  <select name="university" defaultValue="">
                    <option value="">Select…</option>
                    <option>ULB</option>
                    <option>VUB</option>
                    <option>UCLouvain</option>
                    <option>KU Leuven</option>
                    <option>UGent</option>
                    <option>ICHEC</option>
                    <option>IHECS</option>
                    <option>Solvay</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="fgrp">
                  <label>City</label>
                  <select name="city" defaultValue="Brussels">
                    <option>Brussels</option>
                    <option>Leuven</option>
                    <option>Ghent</option>
                    <option>Antwerp</option>
                    <option>Louvain-la-Neuve</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="consent">
                <input type="checkbox" id="consent" required />
                <label htmlFor="consent">I agree to receive my invite & launch updates. See our <a href="https://docs.google.com/document/d/e/2PACX-1vR3jCmHco-cbrZOWXppVlFe84S82ihaRjvN0iZSdkC-ergi7BmoKlDaNgu17bnTN07kzrvSIrciewyc/pub" target="_blank" rel="noopener">privacy policy</a>.</label>
              </div>
              <button type="submit" className="btn-full">Join the waitlist <span className="arr">↗</span></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q:'How does Junto notify me when friends are nearby?', a:"When a friend from one of your circles arrives at a place that matters (a café, your campus library, a venue you both like), Junto sends you one short notification. That's it. No feed, no real-time tracking, no live map of where anyone is." },
    { q:'Does Junto track my live location?', a:"No. Junto uses a place-based check-in model: your device notices you've arrived somewhere relevant, shares that briefly to the circles you chose, and forgets it. We don't store a trail, and there's no 'always-on' map." },
    { q:'Can I choose who gets notified when I\'m out?', a:"Yes. You create circles (coffee people, study friends, the Thursday crew) and decide which ones see your presence at which kinds of places. You can mute a circle, set quiet hours, or go dark for a day with one tap." },
    { q:'How often will I get notifications?', a:"Rarely, on purpose. Junto is designed to feel like a friend tapping you on the shoulder, not a feed. Most users get 2–4 relevant pings a week. You can dial it up or down per circle." },
    { q:'Is Junto only for students?', a:"We're launching with Brussels universities first because that's where spontaneous meet-ups happen fastest. But Junto is for anyone who wants less group chat and more real life. You can join the waitlist in any city. We'll open campuses and neighborhoods in waves." },
    { q:'When does it launch?', a:"Closed alpha with Brussels universities is rolling out spring 2026. Waitlist members get the first invites; ambassadors get early access plus a chance to shape how circles work on their campus." },
  ];
  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <Reveal>
          <span className="eyebrow">FAQ · 09</span>
          <h2 style={{marginTop:16}}>The honest answers.</h2>
        </Reveal>
        <Reveal className="faq-list" delay={1}>
          {items.map((it, i) => (
            <div key={i} className={`fq ${open===i?'open':''}`} onClick={()=>setOpen(open===i?-1:i)}>
              <div className="fq-q">{it.q}<span className="plus"></span></div>
              <div className="fq-a">{it.a}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Report() {
  const [sent, setSent] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const btn = f.querySelector('.btn-full');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const data = {
      category: f.category.value,
      subject: f.subject.value,
      details: f.details.value,
      email: f.complaintEmail.value,
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(COMPLAINT_SHEET_URL, {
        method:'POST', mode:'no-cors',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data),
      });
    } catch {}
    setSent(true);
  };
  return (
    <section className="report" id="report">
      <div className="wrap rp-grid">
        <Reveal className="rp-left">
          <span className="eyebrow">Contact · 10</span>
          <h2 style={{marginTop:16}}>Questions? We're here.</h2>
          <p className="lede">Whether you have a question about Junto, want to partner with us, or just want to say hello: we read every message and reply within 48 hours.</p>
        </Reveal>
        <Reveal className="rp-card" delay={1}>
          {sent ? (
            <div className="success">
              <div className="big">Received.</div>
              <p>Thanks for flagging this. We'll review and follow up at the email you provided, if any.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="fgrp">
                <label>Category</label>
                <select name="category" defaultValue="" required>
                  <option value="">Select…</option>
                  <option>General question</option>
                  <option>Partnership or press</option>
                  <option>Bug report</option>
                  <option>Privacy concern</option>
                  <option>Feedback or idea</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="fgrp">
                <label>Subject</label>
                <input type="text" name="subject" placeholder="Short summary" required />
              </div>
              <div className="fgrp">
                <label>Details</label>
                <textarea name="details" placeholder="What happened, where, and when…" required />
              </div>
              <div className="fgrp">
                <label>Your email (optional, for follow-up)</label>
                <input type="email" name="complaintEmail" placeholder="you@domain.com" />
              </div>
              <button type="submit" className="btn-full">Send message <span className="arr">↗</span></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="brand-col">
            <h3>Junto</h3>
            <p>A quieter way to see your friends in real life. Built in Brussels, launching at universities first.</p>
            <a href="#waitlist" className="btn btn-primary" style={{marginTop:20}}>Join the waitlist <span className="arr">↗</span></a>
          </div>
          <div>
            <h6>Product</h6>
            <div className="links">
              <a href="#how">How it works</a>
              <a href="#privacy">Privacy model</a>
              <a href="#community">Community</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
          <div>
            <h6>Company</h6>
            <div className="links">
              <a href="mailto:contact@juntosocials.com">Contact</a>
              <a href="#waitlist">Ambassadors</a>
              <a href="#waitlist">Partners</a>
              <a href="#report">Safety</a>
            </div>
          </div>
          <div>
            <h6>Legal</h6>
            <div className="links">
              <a href="https://docs.google.com/document/d/e/2PACX-1vR3jCmHco-cbrZOWXppVlFe84S82ihaRjvN0iZSdkC-ergi7BmoKlDaNgu17bnTN07kzrvSIrciewyc/pub" target="_blank" rel="noopener">Privacy policy</a>
              <a href="https://docs.google.com/document/d/e/2PACX-1vReVbRrenxKTFxVrYKwT9CzwIB6Yn6RM95Yk6hVqDBSTK8Ro3YG6BbwEcsp-e_pe7dmgEEg7ci5tKVl/pub" target="_blank" rel="noopener">Terms</a>
              <a href="https://docs.google.com/document/d/e/2PACX-1vRVNHzkXq5atw0JGcEaWTsFfVXzNnzFpDMlNK0D-2EA2OJqxwQBHHngaUFddxdRC-u_lKHMX3DO8D0C/pub" target="_blank" rel="noopener">EULA</a>
              <a href="https://docs.google.com/document/d/e/2PACX-1vR3jCmHco-cbrZOWXppVlFe84S82ihaRjvN0iZSdkC-ergi7BmoKlDaNgu17bnTN07kzrvSIrciewyc/pub" target="_blank" rel="noopener">Data requests</a>
            </div>
          </div>
        </div>
        <div className="footer-bot">
          <div className="legal">© 2026 Junto · Brussels · All rights reserved</div>
          <div className="socials">
            <a href="https://instagram.com/juntosocials" target="_blank" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com/company/juntosocials" target="_blank" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:contact@juntosocials.com" aria-label="Email" style={{fontFamily:'JetBrains Mono, monospace',fontSize:12,letterSpacing:'.08em'}}>contact@juntosocials.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <ValueProp />
      {FEATURES.howItWorks      && <HowItWorks />}
      {FEATURES.circlesBuilder  && <CirclesBuilder />}
      {FEATURES.privacy         && <Privacy />}
      {FEATURES.moment          && <Moment />}
      {FEATURES.highlights      && <Highlights />}
      {FEATURES.differentiation && <Differentiation />}
      {FEATURES.proof           && <Proof />}
      {FEATURES.instagramFeed   && <InstagramFeed />}
      {FEATURES.waitlist        && <Waitlist />}
      {FEATURES.faq             && <FAQ />}
      {FEATURES.report          && <Report />}
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
