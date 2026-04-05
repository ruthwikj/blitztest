import React, { useState, useRef, useEffect } from 'react';

// ─── Styles ────────────────────────────────────────────────────────────────

const s = {
  root: {
    minHeight: '100vh',
    background: '#0a0a0f',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '0 0 80px',
  },
  header: {
    borderBottom: '1px solid #1e1e2e',
    padding: '24px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: '#fff',
  },
  logoAccent: { color: '#7c6af7' },
  tagline: { fontSize: 13, color: '#64748b', marginLeft: 4 },
  main: { maxWidth: 880, margin: '0 auto', padding: '48px 24px 0' },
  hero: { textAlign: 'center', marginBottom: 48 },
  heroTitle: {
    fontSize: 42,
    fontWeight: 800,
    letterSpacing: '-1px',
    lineHeight: 1.15,
    marginBottom: 14,
    background: 'linear-gradient(135deg, #fff 40%, #7c6af7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: { fontSize: 17, color: '#94a3b8', maxWidth: 520, margin: '0 auto' },
  inputRow: {
    display: 'flex',
    gap: 10,
    maxWidth: 640,
    margin: '0 auto 48px',
  },
  input: {
    flex: 1,
    background: '#13131f',
    border: '1px solid #2a2a3e',
    borderRadius: 10,
    padding: '14px 18px',
    fontSize: 15,
    color: '#e2e8f0',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  inputFocus: { borderColor: '#7c6af7' },
  btn: {
    background: '#7c6af7',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '14px 28px',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.15s, transform 0.1s',
  },
  btnDisabled: {
    background: '#3a3a5c',
    cursor: 'not-allowed',
    transform: 'none',
  },
  section: { marginBottom: 36 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: 14,
  },
  feedCard: {
    background: '#13131f',
    border: '1px solid #1e1e2e',
    borderRadius: 12,
    padding: '0',
    maxHeight: 320,
    overflowY: 'auto',
  },
  feedItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 16px',
    borderBottom: '1px solid #1a1a2e',
    animation: 'fadeIn 0.25s ease',
  },
  feedIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    flexShrink: 0,
    marginTop: 1,
  },
  feedText: { fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 },
  feedMeta: { fontSize: 11, color: '#475569', marginTop: 2 },
  personaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 14,
  },
  personaCard: {
    background: '#13131f',
    border: '1px solid #1e1e2e',
    borderRadius: 12,
    padding: '16px 18px',
    transition: 'border-color 0.2s',
  },
  personaCardActive: { borderColor: '#7c6af7' },
  personaCardDone: { borderColor: '#22c55e' },
  personaCardError: { borderColor: '#ef4444' },
  personaAvatar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: '#2a2a4a',
    color: '#7c6af7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 10,
  },
  personaName: { fontWeight: 600, fontSize: 14, marginBottom: 4 },
  personaDesc: { fontSize: 12, color: '#64748b', lineHeight: 1.5 },
  personaStatus: { fontSize: 11, marginTop: 10, fontWeight: 600 },
  statusPulse: { color: '#7c6af7' },
  statusDone: { color: '#22c55e' },
  statusError: { color: '#ef4444' },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 14,
    marginBottom: 28,
  },
  resultCard: {
    background: '#13131f',
    border: '1px solid #1e1e2e',
    borderRadius: 12,
    padding: '18px',
  },
  resultHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 },
  resultAvatar: {
    width: 36,
    height: 36,
    borderRadius: 9,
    background: '#2a2a4a',
    color: '#7c6af7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  resultName: { fontWeight: 600, fontSize: 14 },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    marginTop: 3,
  },
  badgeConverted: { background: '#14532d', color: '#4ade80' },
  badgeBounced: { background: '#450a0a', color: '#f87171' },
  resultLabel: { fontSize: 11, color: '#475569', marginTop: 12, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  frictionList: { paddingLeft: 16, fontSize: 12, color: '#94a3b8', lineHeight: 1.8 },
  abSuggestion: {
    background: '#0f0f1e',
    border: '1px solid #2a2a4a',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 12,
    color: '#a5b4fc',
    marginTop: 6,
    lineHeight: 1.5,
  },
  synthesisCard: {
    background: '#13131f',
    border: '1px solid #2a2a4a',
    borderRadius: 14,
    padding: '24px',
    marginBottom: 14,
  },
  synthesisTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
  synthesisSummary: { fontSize: 14, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 },
  abTestList: { display: 'flex', flexDirection: 'column', gap: 12 },
  abTestItem: {
    background: '#0f0f1e',
    border: '1px solid #1e1e2e',
    borderRadius: 10,
    padding: '16px',
  },
  abTestRank: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 6,
    background: '#7c6af7',
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    marginRight: 10,
  },
  abTestTitle: { fontSize: 14, fontWeight: 600, display: 'inline' },
  abTestHyp: { fontSize: 12, color: '#64748b', marginTop: 6, lineHeight: 1.6 },
  abTestVariant: { fontSize: 12, color: '#a5b4fc', marginTop: 6, lineHeight: 1.5 },
  priorityBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    verticalAlign: 'middle',
  },
  priorityHigh: { background: '#450a0a', color: '#f87171' },
  priorityMedium: { background: '#431407', color: '#fb923c' },
  priorityLow: { background: '#1e3a2e', color: '#4ade80' },
  emptyState: { textAlign: 'center', padding: '60px 0', color: '#475569' },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 15 },
  statsRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    background: '#0f0f1e',
    border: '1px solid #1e1e2e',
    borderRadius: 10,
    padding: '14px 16px',
  },
  statLabel: { fontSize: 11, color: '#475569', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 },
  statValue: { fontSize: 22, fontWeight: 700 },
  topIssues: { paddingLeft: 18, fontSize: 13, color: '#94a3b8', lineHeight: 2 },
  spinner: {
    display: 'inline-block',
    width: 14,
    height: 14,
    border: '2px solid #2a2a4a',
    borderTopColor: '#7c6af7',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    marginRight: 8,
    verticalAlign: 'middle',
  },
  errorBanner: {
    background: '#2d0a0a',
    border: '1px solid #7f1d1d',
    borderRadius: 10,
    padding: '14px 18px',
    fontSize: 13,
    color: '#fca5a5',
    marginBottom: 24,
  },
};

const globalStyles = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 3px; }
`;

// ─── Feed event type config ─────────────────────────────────────────────────

const EVENT_CONFIG = {
  status: { icon: '⚙', bg: '#1e1e2e', label: 'System' },
  scraped: { icon: '🌐', bg: '#0f2a1e', label: 'URL Loaded' },
  persona_start: { icon: '▶', bg: '#1a1a3e', label: 'Agent Started' },
  persona_done: { icon: '✓', bg: '#0f2a1e', label: 'Agent Done' },
  complete: { icon: '★', bg: '#1a0f2e', label: 'Complete' },
  error: { icon: '✕', bg: '#2a0f0f', label: 'Error' },
};

// ─── Components ─────────────────────────────────────────────────────────────

function FeedItem({ event }) {
  const cfg = EVENT_CONFIG[event.type] || EVENT_CONFIG.status;
  let text = '';
  let meta = '';

  switch (event.type) {
    case 'status':
      text = event.message;
      break;
    case 'scraped':
      text = `Loaded ${event.url}`;
      meta = `Running ${event.personas?.length || 0} persona agents`;
      break;
    case 'persona_start':
      text = `${event.persona_name} is browsing the site`;
      meta = event.description;
      break;
    case 'persona_done':
      const r = event.result;
      text = `${r.persona_name} finished — ${r.converted ? 'Converted' : 'Bounced'}`;
      meta = r.friction_points?.length ? `${r.friction_points.length} friction point(s) found` : 'No friction points logged';
      break;
    case 'complete':
      text = 'Simulation complete — results ready';
      break;
    case 'error':
      text = `Error: ${event.message}`;
      break;
    default:
      text = JSON.stringify(event);
  }

  return (
    <div style={s.feedItem}>
      <div style={{ ...s.feedIcon, background: cfg.bg }}>{cfg.icon}</div>
      <div>
        <div style={s.feedText}>{text}</div>
        {meta && <div style={s.feedMeta}>{meta}</div>}
      </div>
    </div>
  );
}

function PersonaCard({ persona, status }) {
  const cardStyle = {
    ...s.personaCard,
    ...(status === 'running' ? s.personaCardActive : {}),
    ...(status === 'done' ? s.personaCardDone : {}),
    ...(status === 'error' ? s.personaCardError : {}),
  };

  return (
    <div style={cardStyle}>
      <div style={s.personaAvatar}>{persona.initials}</div>
      <div style={s.personaName}>{persona.name}</div>
      <div style={s.personaDesc}>{persona.description}</div>
      {status === 'running' && (
        <div style={{ ...s.personaStatus, ...s.statusPulse }}>
          <span style={s.spinner} />Browsing...
        </div>
      )}
      {status === 'done' && (
        <div style={{ ...s.personaStatus, ...s.statusDone }}>✓ Done</div>
      )}
      {status === 'error' && (
        <div style={{ ...s.personaStatus, ...s.statusError }}>✕ Error</div>
      )}
      {!status && <div style={{ ...s.personaStatus, color: '#475569' }}>Queued</div>}
    </div>
  );
}

function ResultCard({ result }) {
  return (
    <div style={s.resultCard}>
      <div style={s.resultHeader}>
        <div style={s.resultAvatar}>{result.persona_initials}</div>
        <div>
          <div style={s.resultName}>{result.persona_name}</div>
          <span style={{ ...s.badge, ...(result.converted ? s.badgeConverted : s.badgeBounced) }}>
            {result.converted ? 'Converted' : 'Bounced'}
          </span>
        </div>
      </div>

      {result.friction_points?.length > 0 && (
        <>
          <div style={s.resultLabel}>Friction Points</div>
          <ul style={s.frictionList}>
            {result.friction_points.map((fp, i) => <li key={i}>{fp}</li>)}
          </ul>
        </>
      )}

      {result.drop_off_reason && (
        <>
          <div style={s.resultLabel}>Drop-off Reason</div>
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{result.drop_off_reason}</div>
        </>
      )}

      {result.ab_test_suggestion && (
        <>
          <div style={s.resultLabel}>A/B Suggestion</div>
          <div style={s.abSuggestion}>{result.ab_test_suggestion}</div>
        </>
      )}

      {result.error && (
        <>
          <div style={{ ...s.resultLabel, color: '#ef4444' }}>Error</div>
          <div style={{ fontSize: 12, color: '#f87171' }}>{result.error}</div>
        </>
      )}
    </div>
  );
}

function PriorityBadge({ priority }) {
  const style = priority === 'high' ? s.priorityHigh : priority === 'medium' ? s.priorityMedium : s.priorityLow;
  return <span style={{ ...s.priorityBadge, ...style }}>{priority}</span>;
}

function SynthesisPanel({ synthesis, results }) {
  const converted = results.filter(r => r.converted).length;

  return (
    <div style={s.synthesisCard}>
      <div style={s.synthesisTitle}>AI Synthesis</div>

      <div style={s.statsRow}>
        <div style={s.statBox}>
          <div style={s.statLabel}>Conversion Rate</div>
          <div style={{ ...s.statValue, color: converted > 0 ? '#4ade80' : '#f87171' }}>
            {converted}/{results.length}
          </div>
        </div>
        <div style={s.statBox}>
          <div style={s.statLabel}>Issues Found</div>
          <div style={{ ...s.statValue, color: '#fb923c' }}>
            {synthesis.top_issues?.length || 0}
          </div>
        </div>
        <div style={s.statBox}>
          <div style={s.statLabel}>A/B Tests</div>
          <div style={{ ...s.statValue, color: '#a5b4fc' }}>
            {synthesis.ab_tests?.length || 0}
          </div>
        </div>
      </div>

      {synthesis.summary && (
        <div style={s.synthesisSummary}>{synthesis.summary}</div>
      )}

      {synthesis.top_issues?.length > 0 && (
        <>
          <div style={s.sectionTitle}>Top Issues</div>
          <ul style={s.topIssues}>
            {synthesis.top_issues.map((issue, i) => <li key={i}>{issue}</li>)}
          </ul>
          <div style={{ marginTop: 20 }} />
        </>
      )}

      {synthesis.ab_tests?.length > 0 && (
        <>
          <div style={s.sectionTitle}>Recommended A/B Tests</div>
          <div style={s.abTestList}>
            {synthesis.ab_tests.map((test, i) => (
              <div key={i} style={s.abTestItem}>
                <span style={s.abTestRank}>{test.rank || i + 1}</span>
                <span style={s.abTestTitle}>{test.title}</span>
                <PriorityBadge priority={test.priority} />
                <div style={s.abTestHyp}>{test.hypothesis}</div>
                {test.variant && (
                  <div style={s.abTestVariant}>→ {test.variant}</div>
                )}
                {test.personas_affected?.length > 0 && (
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 6 }}>
                    Affects: {test.personas_affected.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [url, setUrl] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [running, setRunning] = useState(false);
  const [feed, setFeed] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [personaStatuses, setPersonaStatuses] = useState({});
  const [results, setResults] = useState([]);
  const [synthesis, setSynthesis] = useState(null);
  const [error, setError] = useState(null);
  const feedRef = useRef(null);
  const esRef = useRef(null);

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feed]);

  const addFeedEvent = (event) => {
    setFeed(prev => [...prev, event]);
  };

  const startSimulation = () => {
    if (!url.trim() || running) return;

    // Reset state
    setRunning(true);
    setFeed([]);
    setPersonas([]);
    setPersonaStatuses({});
    setResults([]);
    setSynthesis(null);
    setError(null);

    // Close any existing SSE connection
    if (esRef.current) esRef.current.close();

    const encodedUrl = encodeURIComponent(url.trim());
    const es = new EventSource(`/simulate?url=${encodedUrl}`);
    esRef.current = es;

    es.onmessage = (e) => {
      let event;
      try {
        event = JSON.parse(e.data);
      } catch {
        return;
      }

      addFeedEvent(event);

      switch (event.type) {
        case 'scraped':
          if (event.personas) setPersonas(event.personas);
          break;
        case 'persona_start':
          setPersonaStatuses(prev => ({ ...prev, [event.persona_id]: 'running' }));
          break;
        case 'persona_done':
          setPersonaStatuses(prev => ({ ...prev, [event.result.persona_id]: event.result.error ? 'error' : 'done' }));
          setResults(prev => [...prev, event.result]);
          break;
        case 'complete':
          if (event.synthesis) setSynthesis(event.synthesis);
          if (event.results) setResults(event.results);
          setRunning(false);
          es.close();
          break;
        case 'error':
          setError(event.message);
          setRunning(false);
          es.close();
          break;
        default:
          break;
      }
    };

    es.onerror = () => {
      if (running) {
        setError('Connection to backend lost. Make sure the server is running.');
        setRunning(false);
      }
      es.close();
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') startSimulation();
  };

  const hasStarted = feed.length > 0;

  return (
    <div style={s.root}>
      <style>{globalStyles}</style>

      <header style={s.header}>
        <div style={s.logo}>
          <span style={s.logoAccent}>Blitz</span>Test
        </div>
        <div style={s.tagline}>AI-powered A/B test discovery</div>
      </header>

      <main style={s.main}>
        {!hasStarted && (
          <div style={s.hero}>
            <div style={s.heroTitle}>Find what to A/B test<br />before going live</div>
            <div style={s.heroSub}>
              AI agents simulate real customer personas browsing your store and surface friction points worth testing.
            </div>
          </div>
        )}

        <div style={s.inputRow}>
          <input
            style={{ ...s.input, ...(inputFocused ? s.inputFocus : {}) }}
            type="url"
            placeholder="https://your-store.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            disabled={running}
          />
          <button
            style={{ ...s.btn, ...(running || !url.trim() ? s.btnDisabled : {}) }}
            onClick={startSimulation}
            disabled={running || !url.trim()}
          >
            {running ? <><span style={s.spinner} />Analyzing…</> : 'Analyze Site'}
          </button>
        </div>

        {error && (
          <div style={s.errorBanner}>⚠ {error}</div>
        )}

        {personas.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Active Personas</div>
            <div style={s.personaGrid}>
              {personas.map(p => (
                <PersonaCard
                  key={p.id}
                  persona={p}
                  status={personaStatuses[p.id]}
                />
              ))}
            </div>
          </div>
        )}

        {feed.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Live Activity</div>
            <div style={s.feedCard} ref={feedRef}>
              {feed.map((event, i) => (
                <FeedItem key={i} event={event} />
              ))}
            </div>
          </div>
        )}

        {synthesis && results.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Synthesis & Recommendations</div>
            <SynthesisPanel synthesis={synthesis} results={results} />
          </div>
        )}

        {results.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Persona Results</div>
            <div style={s.resultsGrid}>
              {results.map((r, i) => <ResultCard key={i} result={r} />)}
            </div>
          </div>
        )}

        {!hasStarted && (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>🛍</div>
            <div style={s.emptyText}>Enter a store URL above to run your first simulation</div>
          </div>
        )}
      </main>
    </div>
  );
}
