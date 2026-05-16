// ========== PART 3: Privacy, Moment, Highlights, Differentiation, Proof ==========

function Privacy() {
  const [mode, setMode] = React.useState('selective'); // 'always' | 'selective'
  return (
    <section className="privacy" id="privacy">
      <div className="wrap">
        <Reveal className="privacy-head">
          <div>
            <span className="eyebrow">Privacy · 03</span>
            <h2 style={{marginTop:16}}>Shared when it <em>matters.</em><br/>Quiet the rest of the time.</h2>
          </div>
          <p className="lede">Junto isn't a map of where you are. It's a signal that says "I'm at a place, and I'm open to company." You control the when, the who, and the for-how-long.</p>
        </Reveal>

        <Reveal className="compare" delay={1}>
          <div className="col them">
            <h4>Always-on tracking</h4>
            <div className="badge">The old way</div>
            <div className="vis"></div>
            <ul>
              <li>Live location visible 24/7</li>
              <li>Friends (and acquaintances) always know where you are</li>
              <li>Data collected by default</li>
              <li>One setting for everyone</li>
            </ul>
          </div>
          <div className="col us">
            <h4>Junto's selective presence</h4>
            <div className="badge">Our way</div>
            <div className="vis"><div className="me"></div></div>
            <ul>
              <li>Location used only to detect a check-in at a place</li>
              <li>Only your selected circles see it — briefly</li>
              <li>No background tracking, no history feed</li>
              <li>Per-circle rules, quiet hours, instant pause</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="reveal" delay={2}>
          <div style={{marginTop:56,padding:'28px 32px',borderRadius:22,border:'1px solid var(--line-dark)',background:'var(--ink-2)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
            <div style={{maxWidth:440}}>
              <div className="eyebrow" style={{color:'var(--dusk)'}}>Try it</div>
              <div style={{fontFamily:'Instrument Serif,serif',fontSize:26,marginTop:8,lineHeight:1.2}}>Toggle sharing modes — see what your circles would see.</div>
            </div>
            <div style={{display:'flex',gap:10,background:'var(--ink-3)',padding:6,borderRadius:999,border:'1px solid var(--line-dark)'}}>
              <button onClick={()=>setMode('always')} style={{padding:'10px 18px',borderRadius:999,fontSize:13,background:mode==='always'?'var(--ember)':'transparent',color:mode==='always'?'#fff':'var(--mute-dark)'}}>Always-on</button>
              <button onClick={()=>setMode('selective')} style={{padding:'10px 18px',borderRadius:999,fontSize:13,background:mode==='selective'?'var(--dusk)':'transparent',color:mode==='selective'?'#fff':'var(--mute-dark)'}}>Junto (selective)</button>
            </div>
            <div style={{flex:'1 1 100%',padding:'16px 20px',borderRadius:14,background:'rgba(245,240,232,.04)',border:'1px solid var(--line-dark)',fontSize:14,lineHeight:1.5,color:'var(--mute-dark)'}}>
              {mode === 'always'
                ? <>Your friends see: <span style={{color:'var(--ember)'}}>Gare du Midi → Avenue Louise → Flagey → home</span>. A full day's trail, continuously updated.</>
                : <>Your friends see: <span style={{color:'var(--dusk)'}}>"at Café Belga, until 15:30."</span> That's it. No trail, no history, nothing before or after.</>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Moment() {
  const scenes = [
    { cls:'coffee', time:'14:22 · Tuesday', title:'Coffee, before the 3pm', cap:'Léa is two blocks away. You haven\'t caught up since August.', pin:'Café Belga' },
    { cls:'class',  time:'18:05 · Wednesday', title:'After class, before home', cap:'Three study friends at Place Flagey. One beer, then laptop again.', pin:'Flagey' },
    { cls:'night',  time:'22:11 · Thursday', title:'The Thursday crew is out', cap:'Sam, Nora and Oskar at La Pharmacie Anglaise. Short walk. Worth it.', pin:'Sablon' },
  ];
  return (
    <section className="moment section-paper">
      <div className="wrap">
        <Reveal className="moment-head">
          <span className="eyebrow">Live the moment · 04</span>
          <h2 style={{marginTop:16}}>Less planning. <em>More</em> showing up.</h2>
          <p className="lede">The best nights out weren't in the group chat. They started with "wait, you're here?"</p>
        </Reveal>
        <div className="scenes">
          {scenes.map((s,i) => (
            <Reveal key={i} className={`scene ${s.cls}`} delay={i+1}>
              <div>
                <div className="time">{s.time}</div>
              </div>
              <div>
                <div className="inline-pin" style={{marginBottom:16}}><span className="d"></span>{s.pin}</div>
                <div className="title serif">{s.title}</div>
                <div className="cap" style={{marginTop:12}}>{s.cap}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="hl">
      <div className="wrap hl-grid">
        <Reveal>
          <span className="eyebrow">Highlights · 06</span>
          <h2 style={{marginTop:16}}>A <em>quiet</em> recap of real life.</h2>
          <p className="lede">At the end of each month, Junto shows you the people you actually saw, the places you kept coming back to, and the moments worth remembering. For you — not for a feed.</p>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <div style={{padding:'10px 14px',borderRadius:999,border:'1px solid var(--line-dark)',fontSize:12,fontFamily:'JetBrains Mono,monospace',color:'var(--mute-dark)',letterSpacing:'.08em'}}>Private by default</div>
            <div style={{padding:'10px 14px',borderRadius:999,border:'1px solid var(--line-dark)',fontSize:12,fontFamily:'JetBrains Mono,monospace',color:'var(--mute-dark)',letterSpacing:'.08em'}}>Shareable, never forced</div>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="recap">
            <div className="recap-head">
              <div>
                <div className="month">October</div>
                <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,color:'rgba(255,255,255,.7)',letterSpacing:'.1em',marginTop:4}}>12 spontaneous meet-ups</div>
              </div>
              <div className="year">2026 · private</div>
            </div>
            <div className="recap-section">
              <h5>Partners in crime</h5>
              <div className="people">
                <div className="person"><div className="av av-e"></div><div className="n">Alexandre</div><div className="c">5 times</div></div>
                <div className="person"><div className="av av-d"></div><div className="n">Lucie</div><div className="c">4 times</div></div>
                <div className="person"><div className="av av-s"></div><div className="n">Sam</div><div className="c">3 times</div></div>
                <div className="person"><div className="av av-p"></div><div className="n">Nora</div><div className="c">2 times</div></div>
              </div>
            </div>
            <div className="recap-section">
              <h5>Where you kept coming back</h5>
              <div className="spots">
                <div className="spot" style={{'--spot-bg':'linear-gradient(135deg,#8b5a3c,#5a3824)'}}>
                  <div className="n">Café Belga</div>
                  <div className="v">4×</div>
                </div>
                <div className="spot" style={{'--spot-bg':'linear-gradient(135deg,#4a6fa8,#2a4a7c)'}}>
                  <div className="n">ULB Library</div>
                  <div className="v">6×</div>
                </div>
                <div className="spot" style={{'--spot-bg':'linear-gradient(135deg,#7a5680,#4a2f50)'}}>
                  <div className="n">Flagey</div>
                  <div className="v">3×</div>
                </div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat"><div className="k">18h</div><div className="l">in real life</div></div>
              <div className="stat"><div className="k">9</div><div className="l">new places</div></div>
              <div className="stat"><div className="k">0</div><div className="l">group chats needed</div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Differentiation() {
  const rows = [
    { from:'endless group chats', to:'one gentle nudge when it matters', },
    { from:'a feed that replaces your day', to:'a signal that makes your day', },
    { from:'live tracking, always on', to:'selective presence, on your terms', },
    { from:'algorithm decides what you see', to:'you decide who belongs where', },
    { from:'"we should hang out soon"', to:'"I\'m 6 minutes away, let\'s go"', },
  ];
  return (
    <section className="diff section-light">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Not another social app · 05</span>
          <h2 style={{marginTop:16}}>Junto replaces the parts of social that <em>drain</em> you — and keeps the part that <em>matters.</em></h2>
        </Reveal>
        <Reveal className="diff-rows" delay={1}>
          {rows.map((r,i) => (
            <div className="d-row" key={i}>
              <div className="num">0{i+1} · {String(i+1).padStart(2,'0')}</div>
              <div className="from">{r.from}</div>
              <div className="arr">→</div>
              <div className="to">{r.to}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  const quotes = [
    { q:'Finally a social app that makes me text less and see people more. My group chats have stopped being where my plans die.', n:'Camille L.', r:'ULB · second year', tone:'av-e' },
    { q:'I love that it isn\'t a map of me. It just lights up for ten minutes and then it\'s quiet again. That feels right.', n:'Joris V.', r:'VUB · graduate', tone:'av-d' },
    { q:'Made my Brussels smaller in the good way. I keep running into the two friends I was going to text "next week" anyway.', n:'Inès R.', r:'Solvay · alumna', tone:'av-s' },
  ];
  return (
    <section className="proof">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Social proof · 06</span>
          <h3 style={{marginTop:16}}>Early believers · Brussels alpha testers</h3>
        </Reveal>
        <Reveal className="quotes" delay={1}>
          {quotes.map((q,i) => (
            <div className="q" key={i}>
              <p>"{q.q}"</p>
              <div className="who">
                <div className={`av ${q.tone}`}></div>
                <div>
                  <div className="n">{q.n}</div>
                  <div className="r">{q.r}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="logos" delay={2}>
          <span className="logo-item serif-it">ULB</span>
          <span className="logo-item">VUB</span>
          <span className="logo-item mono">Solvay</span>
          <span className="logo-item serif-it">UCLouvain</span>
          <span className="logo-item mono">ICHEC</span>
          <span className="logo-item">IHECS</span>
        </Reveal>
      </div>
    </section>
  );
}

// ── Instagram Feed — retro polaroid grid ──────────────────────────────────────
// 1. Go to behold.so → connect @juntosocials → create a feed → copy the Feed ID
// 2. Paste it below. Done.
const BEHOLD_FEED_ID = 'HPkvcV1OkR4s2SWeIDvk';

const POLAROID_ROTS = ['-3deg','2.5deg','-1.5deg','3deg','-2.5deg','1.5deg','-3.5deg','2deg','-1deg'];

function InstagramFeed() {
  const [posts, setPosts] = React.useState([]);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    if (!BEHOLD_FEED_ID) { setStatus('no-id'); return; }
    fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then(r => r.json())
      .then(data => {
        const posts = (data.posts || data || []).slice(0, 9);
        setPosts(posts);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, []);

  // Use Behold's own CDN (never expires) over Instagram's signed URLs
  const thumb = (post) => {
    if (post.sizes && post.sizes.medium) return post.sizes.medium.mediaUrl;
    return post.mediaType === 'VIDEO' ? post.thumbnailUrl : post.mediaUrl;
  };
  const fmtDate = (ts) => new Date(ts).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'2-digit' });
  const cleanCaption = (c) => c ? c.replace(/#\S+/g, '').replace(/@\S+/g, '').trim().slice(0, 88) : '';

  return (
    <section className="insta section-ink-2" id="community">
      <div className="wrap">
        <Reveal className="insta-head">
          <span className="eyebrow">Community · 07</span>
          <div className="insta-title-row">
            <h2 style={{marginTop:16}}>From <em>the gram.</em></h2>
            <a href="https://instagram.com/juntosocials" target="_blank" rel="noopener" className="btn btn-ghost insta-handle">
              @juntosocials <span className="arr">↗</span>
            </a>
          </div>
          <p className="lede">Real people, real meet-ups. Follow along to see Junto come to life in Brussels.</p>
        </Reveal>

        {/* Marquee — real posts (doubled for seamless loop) or skeletons */}
        {(status === 'done' || status === 'loading') && (
          <div className="polaroid-track-wrap">
            <div className="polaroid-track">
              {(status === 'done'
                ? [...posts, ...posts]           // doubled so the loop is seamless
                : [...POLAROID_ROTS, ...POLAROID_ROTS]
              ).map((item, i) => {
                const post = status === 'done' ? item : null;
                return post ? (
                  <a
                    key={`${post.id}-${i}`}
                    href={post.permalink}
                    target="_blank" rel="noopener"
                    className="polaroid"
                    style={{'--rot': POLAROID_ROTS[i % POLAROID_ROTS.length]}}
                  >
                    <div className="polaroid-img">
                      <img src={thumb(post)} alt={cleanCaption(post.caption) || 'Junto on Instagram'} loading="lazy" />
                      {post.mediaType === 'VIDEO'          && <div className="p-badge">▶</div>}
                      {post.mediaType === 'CAROUSEL_ALBUM' && <div className="p-badge">⧉</div>}
                    </div>
                    <div className="polaroid-foot">
                      {cleanCaption(post.caption) && <p className="p-caption">{cleanCaption(post.caption)}</p>}
                      <time className="p-date">{fmtDate(post.timestamp)}</time>
                    </div>
                  </a>
                ) : (
                  <div key={i} className="polaroid polaroid--skel" style={{'--rot': item}} />
                );
              })}
            </div>
          </div>
        )}

        {/* Fallback when no feed ID yet or fetch failed */}
        {(status === 'no-id' || status === 'error') && (
          <div className="insta-fallback">
            <p style={{opacity:.5,marginBottom:20}}>Instagram feed coming soon.</p>
            <a href="https://instagram.com/juntosocials" target="_blank" rel="noopener" className="btn btn-ghost">
              Follow @juntosocials <span className="arr">↗</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Privacy, Moment, Highlights, Differentiation, Proof });
