import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { filterSignals, readSignals, seedSignals, sources, validateSignal, writeSignals, STORAGE_KEY } from './model.js'
import './styles.css'

function Arrow() { return <span aria-hidden="true">↗</span> }
function Mark() { return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M3 7h22M3 14h22M3 21h22M10 7v14M18 7v14" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="7" r="3" fill="currentColor" /><circle cx="18" cy="21" r="3" fill="currentColor" /></svg> }
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); media.addEventListener('change', update); update(); return () => media.removeEventListener('change', update) }, [])
  return reduced
}

function SignalSculpture({ reduced }) {
  const [progress, setProgress] = useState(100)
  const [playing, setPlaying] = useState(false)
  const [angle, setAngle] = useState(-12)
  const [flat, setFlat] = useState(false)
  const figure = useRef(null)
  const progressRef = useRef(progress)
  useEffect(() => { progressRef.current = progress }, [progress])
  useEffect(() => { if (reduced) { setPlaying(false); setProgress(100) } }, [reduced])
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setPlaying(false) }, { threshold: .1 })
    observer.observe(figure.current)
    const stop = () => { if (document.hidden) setPlaying(false) }
    document.addEventListener('visibilitychange', stop)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', stop) }
  }, [])
  useEffect(() => {
    if (!playing || reduced) return
    const start = performance.now() - progressRef.current * 60
    let frame
    const tick = (now) => { const next = Math.min(100, (now - start) / 60); setProgress(next); if (next < 100) frame = requestAnimationFrame(tick); else setPlaying(false) }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, reduced])
  const stage = progress < 34 ? 0 : progress < 68 ? 1 : 2
  const toggle = () => { if (reduced) { setProgress(progress >= 100 ? 0 : progress < 34 ? 50 : 100); return } if (progress >= 100) { progressRef.current = 0; setProgress(0) } setPlaying(p => !p) }
  return <figure className="signal-sculpture" ref={figure} id="motion" aria-labelledby="sculpture-caption">
    <div className="sculpture-top"><span>THE EVIDENCE THREAD</span><span>01 → 03</span></div>
    <div aria-hidden="true" className={`sculpture-space ${flat || reduced ? 'is-flat' : ''}`}>
      <div className="sculpture-plane" style={{ '--turn': `${angle}deg`, '--progress': progress / 100 }}>
        <svg className="thread-path" viewBox="0 0 500 410" aria-hidden="true"><path d="M105 100 C105 200 250 160 250 240 S390 260 390 320M395 110 C395 180 250 170 250 240" /><path className="thread-draw" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress / 100} d="M105 100 C105 200 250 160 250 240 S390 260 390 320M395 110 C395 180 250 170 250 240" /></svg>
        <div className={`paper-note note-one ${stage >= 0 ? 'visible' : ''}`}><span>01 / INTERVIEW</span><p>“Keep the context<br />with the decision.”</p><div className="paper-rule" /><small>Research continuity</small></div>
        <div className={`paper-note note-two ${stage >= 1 ? 'connected' : ''}`}><span>02 / PATTERN</span><p>One idea.<br /><em>Many signals.</em></p><div className="mini-nodes" aria-hidden="true"><i /><i /><i /><b /></div></div>
        <div className={`paper-note note-three ${stage === 2 ? 'resolved' : ''}`}><span>03 / DECISION</span><p>Build with<br />the why attached.</p><small>{stage === 2 ? 'Evidence connected' : 'Waiting for the thread'}</small></div>
      </div>
    </div>
    <figcaption id="sculpture-caption"><span className="stage-number">0{stage + 1}</span><div><strong>{['Capture the signal.', 'Connect the pattern.', 'Make a clear decision.'][stage]}</strong><p>{['Keep the original customer context.', 'Follow the thread across sources.', 'Take the evidence into your next move.'][stage]}</p></div></figcaption>
    <div className="motion-controls"><button onClick={toggle} aria-label={reduced ? 'Next story stage' : playing ? 'Pause story' : progress >= 100 ? 'Replay story' : 'Play story'}>{reduced ? 'Next stage' : playing ? 'Pause' : progress >= 100 ? 'Replay' : 'Play'} <span aria-hidden="true">{playing ? 'Ⅱ' : '→'}</span></button><label><span className="sr-only">Story progress</span><input type="range" min="0" max="100" value={progress} onChange={e => { setPlaying(false); setProgress(Number(e.target.value)) }} aria-valuetext={`${Math.round(progress)} percent, ${['capture', 'connect', 'decide'][stage]}`} /></label><span className="motion-time">{String(Math.round(progress * .06)).padStart(2, '0')} / 06</span></div>
    <details className="spatial-options"><summary>Spatial controls <span>CSS 3D</span></summary><div><label>Rotate the evidence<input type="range" min="-24" max="24" value={angle} disabled={flat || reduced} onChange={e => setAngle(Number(e.target.value))} /></label><button aria-pressed={flat || reduced} disabled={reduced} onClick={() => setFlat(v => !v)}>{flat || reduced ? 'Flat view on' : 'Use flat view'}</button></div>{reduced && <p>Reduced motion is on. The story stays readable without animation.</p>}</details>
  </figure>
}

function SignalDialog({ dialogRef, onSave, onClose, storageError }) {
  const [errors, setErrors] = useState({})
  const submit = (event) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const next = validateSignal(values)
    setErrors(next)
    if (Object.keys(next).length) { event.currentTarget.elements[Object.keys(next)[0]]?.focus(); return }
    if (onSave({ ...values, title: values.title.trim(), detail: values.detail.trim() })) { event.currentTarget.reset(); setErrors({}); dialogRef.current.close() }
  }
  return <dialog ref={dialogRef} onClose={onClose} aria-labelledby="signal-dialog-title" className="signal-dialog">
    <form onSubmit={submit} noValidate><div className="dialog-heading"><p className="eyebrow">NEW SIGNAL</p><button type="button" aria-label="Close new signal" onClick={() => dialogRef.current.close()}>×</button></div><h2 id="signal-dialog-title">Keep the context.</h2><p className="muted">Add a note to this browser’s demo workspace.</p>
      <label htmlFor="signal-title">Title <span>5–100 characters</span></label><input id="signal-title" name="title" autoComplete="off" maxLength="100" aria-invalid={!!errors.title} aria-describedby={errors.title ? 'title-error' : undefined} autoFocus />{errors.title && <p className="field-error" id="title-error">{errors.title}</p>}
      <label htmlFor="signal-source">Source</label><select id="signal-source" name="source">{sources.map(s => <option key={s}>{s}</option>)}</select>
      <label htmlFor="signal-detail">Customer context <span>10–600 characters</span></label><textarea id="signal-detail" name="detail" autoComplete="off" rows="4" maxLength="600" aria-invalid={!!errors.detail} aria-describedby={errors.detail ? 'detail-error' : undefined} />{errors.detail && <p className="field-error" id="detail-error">{errors.detail}</p>}
      {storageError && <p role="alert" className="storage-error">{storageError}</p>}
      <div className="dialog-actions"><button type="button" className="quiet-button" onClick={() => dialogRef.current.close()}>Cancel</button><button type="submit" className="button primary">Save signal <Arrow /></button></div>
    </form>
  </dialog>
}

function Workspace() {
  const [initial] = useState(() => { try { return readSignals(localStorage) } catch { return { signals: seedSignals, error: 'Local storage is unavailable. You can explore the sample workspace.' } } })
  const [signals, setSignals] = useState(initial.signals)
  const [selectedId, setSelectedId] = useState(initial.signals[0]?.id)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [preview, setPreview] = useState('data')
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(initial.error)
  const dialogRef = useRef(null)
  const addButton = useRef(null)
  const detailRef = useRef(null)
  const resetRef = useRef(null)
  const resetButton = useRef(null)
  const visible = filterSignals(signals, query, status)
  const selected = visible.find(s => s.id === selectedId) || visible[0]
  const persist = (next, message) => {
    let result
    try { result = writeSignals(localStorage, next) } catch { result = { ok: false, error: 'This browser could not save your changes. Your input is still here. Allow local storage or try again.' } }
    setStorageError(result.error)
    if (result.ok) { setSignals(next); setNotice(message) }
    return result.ok
  }
  const add = (values) => {
    if (signals.length >= 100) { setStorageError('This local demo holds up to 100 signals. Reset the demo to start again.'); return false }
    const signal = { ...values, id: crypto.randomUUID(), theme: 'Your research', decided: false }
    const saved = persist([signal, ...signals], 'Signal saved in this browser.')
    if (saved) { setQuery(''); setStatus('all'); setPreview('data'); setSelectedId(signal.id) }
    return saved
  }
  const clearFilters = () => { setQuery(''); setStatus('all'); setPreview('data') }
  const reset = () => { try { localStorage.removeItem(STORAGE_KEY); setSignals(seedSignals); setSelectedId(seedSignals[0].id); clearFilters(); setStorageError(''); setNotice('Sample workspace restored.'); resetRef.current.close() } catch { setStorageError('The browser could not reset local data. Allow storage and try again.'); resetRef.current.close() } }
  return <section className="workspace-section section" id="workspace" aria-labelledby="workspace-heading">
    <div className="section-top"><p className="eyebrow">01 / A WORKING PRODUCT</p><span>FICTIONAL DATA. REAL INTERACTIONS.</span></div>
    <div className="section-title"><h2 id="workspace-heading">A place for<br /><em>the whole story.</em></h2><p>Search the signals. Read the context. Carry the useful ones into a decision.</p></div>
    <div className="workspace">
      <div className="workspace-header"><div><Mark /><strong>Research inbox</strong><span className="count">{signals.length}</span></div><button ref={addButton} className="button primary small" onClick={() => { setStorageError(''); dialogRef.current.showModal(); dialogRef.current.querySelector('[name=title]').focus() }}>Add signal <span aria-hidden="true">+</span></button></div>
      <div className="workspace-filters"><label className="search-label"><svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5" stroke="currentColor" /><path d="m12 12 5 5" stroke="currentColor" /></svg><span className="sr-only">Search signals</span><input type="search" placeholder="Find a signal, source, or theme…" value={query} onChange={e => setQuery(e.target.value)} /></label><label><span className="sr-only">Filter signals</span><select aria-label="Filter signals" value={status} onChange={e => setStatus(e.target.value)}><option value="all">All signals</option><option value="open">To review</option><option value="decided">In a decision</option></select></label></div>
      <div className="workspace-body" aria-busy={preview === 'loading'}>
        {preview === 'loading' ? <div className="state-message"><div className="skeleton-lines" aria-hidden="true"><i /><i /><i /></div><h3>Gathering the signals.</h3><p>Loading-state preview. No request is being made.</p><button className="quiet-button" onClick={() => setPreview('data')}>Show sample data</button></div> : preview === 'error' ? <div className="state-message"><span className="state-symbol" aria-hidden="true">!</span><h3>The thread was interrupted.</h3><p>Simulated connection error. Your local signals are safe.</p><button className="button primary" onClick={() => setPreview('data')}>Retry preview <Arrow /></button></div> : preview === 'empty' || !visible.length ? <div className="state-message"><span className="state-symbol" aria-hidden="true">∅</span><h3>{preview === 'empty' ? 'Your next insight starts here.' : 'No signals on this thread.'}</h3><p>{preview === 'empty' ? 'Empty-state preview. Capture a first conversation to begin.' : 'Try another phrase or show all signals.'}</p><button className="quiet-button" onClick={clearFilters}>{preview === 'empty' ? 'Restore sample data' : 'Clear filters'}</button></div> : <>
          <ul className="signal-list" aria-label="Customer signals">{visible.map((signal, index) => <li key={signal.id}><button className={selected?.id === signal.id ? 'selected' : ''} aria-pressed={selected?.id === signal.id} onClick={() => { setSelectedId(signal.id); if (matchMedia('(max-width: 680px)').matches) detailRef.current?.focus() }}><span className="signal-index">{String(index + 1).padStart(2, '0')}</span><span><span className="source-label">{signal.source}{signal.decided && <b>In a decision</b>}</span><strong>{signal.title}</strong></span><Arrow /></button></li>)}</ul>
          <article className="signal-detail" aria-labelledby="detail-title" ref={detailRef} tabIndex="-1"><div className="detail-top"><span className="eyebrow">{selected.source}</span><span>Sample workspace</span></div><h3 id="detail-title">{selected.title}</h3><blockquote>“{selected.detail}”</blockquote><div className="theme-tag"><span>THEME</span><strong>{selected.theme}</strong></div><button className={`button ${selected.decided ? 'secondary' : 'primary'}`} onClick={() => persist(signals.map(s => s.id === selected.id ? { ...s, decided: !s.decided } : s), selected.decided ? 'Signal removed from the decision.' : 'Signal added to the decision.')} aria-pressed={selected.decided}>{selected.decided ? 'Remove from decision' : 'Add to decision'} <span aria-hidden="true">{selected.decided ? '−' : '+'}</span></button><p className="local-note">Stored on this device. Nothing is sent.</p></article>
        </>}
      </div>
      <div className="workspace-footer"><p role="status">{notice || `${visible.length} matching signals · ${signals.filter(s => s.decided).length} in decisions`}</p><button ref={resetButton} onClick={() => resetRef.current.showModal()}>Reset demo</button></div>
    </div>
    {storageError && <p role="alert" className="storage-error">{storageError}</p>}
    <div className="state-preview"><label htmlFor="state-select">Explore interface states</label><select id="state-select" value={preview} onChange={e => { setPreview(e.target.value); setNotice('') }}><option value="data">Local workspace</option><option value="loading">Loading preview</option><option value="empty">Empty preview</option><option value="error">Error + recovery preview</option></select><p>Previews are simulations. Add a signal to try validation and actual local saving.</p></div>
    <SignalDialog dialogRef={dialogRef} onSave={add} onClose={() => addButton.current?.focus()} storageError={storageError} />
    <dialog ref={resetRef} className="signal-dialog reset-dialog" aria-labelledby="reset-title" onClose={() => resetButton.current?.focus()}><h2 id="reset-title">Start a fresh thread?</h2><p>This removes only your Threadline demo changes from this browser and restores the five sample signals.</p><div className="dialog-actions"><button className="quiet-button" onClick={() => resetRef.current.close()} autoFocus>Keep my changes</button><button className="button primary" onClick={reset}>Reset workspace</button></div></dialog>
  </section>
}

const capabilityNotes = [
  ['Direction that fits the task', 'For a reading-heavy product, Swiss structure establishes the hierarchy. Editorial type and warm paper make research feel human. The combined preset is the context-chosen default; the controls also let you supply a direction. These are authored presets, not live AI generation.'],
  ['One system, every screen', 'Semantic colors, shared spacing, a fluid type scale, deliberate mobile layouts, keyboard focus, dialog focus return, field errors, and reduced-motion alternatives are part of the same design contract.'],
  ['Motion with a reason', 'The evidence thread explains capture, connection, and decision in six seconds. You can pause, replay, or scrub. Rotation reveals depth with CSS 3D; flat mode preserves all content. No endless animation, external model, or WebGL dependency.'],
  ['Behavior before polish', 'Validation and combined search/filter behavior began with failing unit tests. Browser checks exercise local persistence, dialog feedback, recovery, keyboard operation, and the comparison controls. The source repository includes the contract, tests, and review notes.'],
  ['An honest scope', 'This is a local interactive concept with fictional customer data. It does not connect accounts, run AI inference, or sync to a backend. Loading and connection-error states are labeled previews. This expanded study is not a controlled model benchmark.'],
]

function App() {
  const [direction, setDirection] = useState('combined')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const reduced = useReducedMotion()
  const preview = new URLSearchParams(location.search).has('preview')
  useEffect(() => { document.documentElement.dataset.direction = direction }, [direction])
  useEffect(() => { const close = e => { if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); menuRef.current?.focus() } }; document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close) }, [menuOpen])
  useEffect(() => { if (location.hash && !preview) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView()) }, [preview])
  return <>
    <a className="skip-link" href="#workspace">Skip to workspace</a>
    <div className="demo-banner"><span>A CONCEPT BUILT WITH RC’S FRONTEND SKILL</span><a href={import.meta.env.BASE_URL} target="_top">Back to the skill <Arrow /></a></div>
    <header className="site-header"><a className="brand" href="#top" aria-label="Threadline home"><Mark /><span>Threadline<span className="brand-dot">/</span></span></a><nav aria-label="Main navigation" className="nav" id="demo-nav" hidden={!menuOpen}><a href="#workspace" onClick={() => setMenuOpen(false)}>The workspace</a><a href="#craft" onClick={() => setMenuOpen(false)}>Behind the design</a></nav><a className="header-link" href="#workspace">Try the workspace <Arrow /></a><button className="menu-toggle" ref={menuRef} aria-controls="demo-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? 'Close' : 'Menu'}</button></header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="small-cross" aria-hidden="true">+</span> LESS NOISE. MORE UNDERSTANDING.</p><h1 id="hero-title">Scattered<br />feedback.<br /><em>Clear decisions.</em></h1><p className="hero-description">Bring the conversations together.<br />Find the thread worth following.</p><a className="button primary" href="#workspace">Explore the workspace <Arrow /></a><div className="hero-footnote"><span>01—03</span><p>Capture the signal.<br />Connect it to what comes next.</p></div></div><SignalSculpture reduced={reduced} /></section>
      <div className="value-strip"><span>Built around the evidence.</span><span>Interviews</span><i aria-hidden="true" /><span>Support</span><i aria-hidden="true" /><span>Surveys</span><i aria-hidden="true" /><span>Product requests</span></div>
      {!preview && <><Workspace /><section className="craft-section section" id="craft" aria-labelledby="craft-title"><div className="section-top"><p className="eyebrow">02 / INTENT, MADE VISIBLE</p><span>THE SKILL BEHIND THE SURFACE</span></div><div className="section-title"><h2 id="craft-title">Considered.<br /><em>Then constructed.</em></h2><p>A direction is more than a skin. Try different type and layout roles within the same product.</p></div><div className="direction-lab"><div><span className="eyebrow">ART DIRECTION</span><h3>{direction === 'combined' ? 'Swiss bones. Editorial soul.' : direction === 'swiss' ? 'A system you can read.' : 'Give the story room.'}</h3><p>{direction === 'combined' ? 'Chosen for this brief: clear structure for the task, warmth for the research.' : direction === 'swiss' ? 'Your direction: a tighter typographic hierarchy, direct language, and an ordered grid.' : 'Your direction: expressive type, a quieter pace, and generous reading space.'}</p></div><fieldset><legend>Choose a direction</legend>{[['combined', 'Swiss + editorial', 'Context-chosen'], ['swiss', 'Swiss', 'Your direction'], ['editorial', 'Editorial', 'Your direction']].map(([value, title, label]) => <label key={value}><input type="radio" name="direction" value={value} checked={direction === value} onChange={() => setDirection(value)} /><span><strong>{title}</strong><small>{label}</small></span><span aria-hidden="true">↗</span></label>)}</fieldset></div><div className="craft-notes">{capabilityNotes.map(([title, text], i) => <details key={title}><summary><span>0{i + 1}</span><h3>{title}</h3><span aria-hidden="true">+</span></summary><p>{text}</p></details>)}</div><a className="source-link" href="https://github.com/RitvikChunamari/rcs-frontend-site/tree/main/docs" target="_blank" rel="noreferrer">Read the design contract and verification notes <Arrow /></a></section><section className="closing"><p className="eyebrow">A LITTLE LESS GUESSWORK.</p><h2>Follow the <em>thread.</em></h2><a className="button primary" href="#workspace">Back to the workspace <Arrow /></a></section></>}
    </main><footer><a className="brand" href="#top"><Mark /><span>Threadline</span></a><p>Fictional product. Working local demo.<br />Designed with RC’s Frontend Skill.</p><a href={import.meta.env.BASE_URL} target="_top">Explore the skill <Arrow /></a></footer>
  </>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
