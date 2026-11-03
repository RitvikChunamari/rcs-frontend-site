import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const disciplines = [
  ['01', 'Research', 'Find the right references. Extract principles. Never clone.'],
  ['02', 'Direction', 'Choose a visual thesis, system, hierarchy, and interaction contract.'],
  ['03', 'UX', 'Shape real journeys, responsive states, accessible semantics, and useful copy.'],
  ['04', 'Build', 'Implement within the existing stack without breaking routes or data.'],
  ['05', 'Motion + 3D', 'Add only what improves comprehension, with low-motion fallbacks.'],
  ['06', 'Proof', 'Test the build, browser, keyboard, accessibility, performance, and APIs.'],
]
const designDirections = ['Minimal', 'Editorial', 'Brutalist', 'Retro', 'Aurora', 'Immersive 3D', 'Glass', 'Kinetic', 'Tactile', 'Cyberpunk', 'Clay', 'Swiss']
const installCommand = 'npx skills add RitvikChunamari/rcs-frontend-skill'

function Mark() {
  return <svg className="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 38V10h17c12 0 19 4 19 14S35 38 23 38H6Z" /><path className="mark-cut" d="M19 30h5c4 0 7-2 7-6s-3-6-7-6h-5v12Z" /></svg>
}
function Arrow() { return <span aria-hidden="true">↗</span> }

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0e0d' : '#f2f0e9')
    localStorage.setItem('rcs-theme', theme)
  }, [theme])
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return <button className="theme-toggle" type="button" onClick={() => setTheme(nextTheme)} aria-label={`Switch to ${nextTheme} mode`} aria-pressed={theme === 'dark'}><span aria-hidden="true">{theme === 'light' ? '◐' : '☀'}</span><span>{theme === 'light' ? 'Dark' : 'Light'}</span></button>
}

function Comparison() {
  const baseUrl = import.meta.env.BASE_URL
  const [position, setPosition] = useState(50)
  return <div className="compare-shell">
    <div className="compare-toolbar"><div className="compare-labels" aria-hidden="true"><span>Before</span><span>After</span></div><div className="compare-actions" aria-label="Comparison presets"><button type="button" aria-pressed={position === 0} onClick={() => setPosition(0)}>Before</button><button type="button" aria-pressed={position === 100} onClick={() => setPosition(100)}>After</button></div></div>
    <div className="compare-viewport" style={{ '--split': `${position}%` }}>
      <iframe title="Threadline website before RC's Frontend Skill" src={`${baseUrl}comparison/before/index.html`} tabIndex="-1" aria-hidden="true" />
      <div className="after-layer" aria-hidden="true"><iframe title="" src={`${baseUrl}comparison/after/index.html`} tabIndex="-1" /></div>
      <div className="compare-seam" aria-hidden="true"><span>↔</span></div>
      <label className="range-label"><span className="visually-hidden">Show after design percentage: {position}%</span><input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-valuetext={`${position}% after design`} /></label>
    </div>
    <p className="compare-help">Drag the seam · Use arrow keys · Choose a side</p>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuButtonRef = useRef(null)
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus() } }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])
  const copyWithSelection = () => {
    const field = document.createElement('textarea')
    field.value = installCommand
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.append(field)
    field.select()
    const succeeded = document.execCommand('copy')
    field.remove()
    return succeeded
  }
  const copyInstall = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(installCommand)
      else if (!copyWithSelection()) throw new Error('Copy unavailable')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { setCopied(copyWithSelection()) }
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="RC's Frontend Skill home"><Mark /><span>RC’S / FRONTEND</span></a>
      <nav className="primary-nav" id="primary-navigation" aria-label="Primary navigation" hidden={!menuOpen}>
        <a href="#compare" onClick={() => setMenuOpen(false)}>Transformation</a><a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a><a href="#install" onClick={() => setMenuOpen(false)}>Install</a><a className="nav-github" href="https://github.com/RitvikChunamari/rcs-frontend-skill">View on GitHub <Arrow /></a>
      </nav>
      <div className="header-actions"><ThemeToggle /><a className="header-cta" href="https://github.com/RitvikChunamari/rcs-frontend-skill">View on GitHub <Arrow /></a><button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={`${menuOpen ? 'Close' : 'Open'} navigation menu`} onClick={() => setMenuOpen((open) => !open)}><span className="menu-icon" aria-hidden="true"><i /><i /></span></button></div>
    </header>

    <main id="main-content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-rail" aria-hidden="true"><span>01 / 07</span><i /><span>DESIGN → PROVE</span></div>
        <div className="hero-copy"><p className="hero-kicker"><span /> Open-source studio workflow for AI coding agents</p><h1 id="hero-title"><span>One skill.</span><strong>Full studio.</strong></h1></div>
        <div className="hero-tool" aria-hidden="true"><div className="tool-head"><span>RCS / SYSTEM</span><span>● READY</span></div><div className="tool-mark"><Mark /></div><div className="tool-grid"><span>RESEARCH</span><span>DIRECTION</span><span>UX</span><span>BUILD</span><span>MOTION</span><span>PROOF</span></div></div>
        <div className="hero-foot"><p>Research, art direction, UX, motion, frontend engineering, accessibility, and release QA—working as one integrated practice.</p><a className="primary-button" href="#compare"><span>See the transformation</span><Arrow /></a></div>
        <div className="hero-proof" aria-hidden="true"><span>MIT</span><span>FREE</span><span>OPEN SOURCE</span><span>12 DIRECTIONS</span><span>1 WORKFLOW</span></div>
      </section>

      <section className="manifesto" aria-label="Product statement"><div className="section-index">02 / THESIS</div><p>Not another component library.</p><h2>A one-stop <em>UX design skill</em> that thinks before it decorates—and proves before it claims.</h2><div className="manifesto-seal" aria-hidden="true"><Mark /><span>THINK / BUILD / VERIFY</span></div></section>

      <section className="comparison-section" id="compare" aria-labelledby="compare-title"><header className="section-heading"><span>03 / Transformation</span><h2 id="compare-title">Same brief.<br /><em>Different standard.</em></h2><p>The real Threadline landing page, before and after the complete RC’s Frontend workflow.</p></header><Comparison /></section>

      <section className="workflow" id="workflow" aria-labelledby="workflow-title"><header className="section-heading inverse"><span>04 / One studio</span><h2 id="workflow-title">From loose idea<br />to <em>verified interface.</em></h2></header><ol className="discipline-list">{disciplines.map(([number, title, text]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">↗</i></li>)}</ol></section>

      <section className="directions" aria-labelledby="directions-title"><div className="directions-title"><span>05 / Art direction atlas</span><h2 id="directions-title">12 directions.<br />One coherent choice.</h2><p>Style follows the product, the audience, and the task—not the trend cycle.</p></div><ol className="direction-grid">{designDirections.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><i aria-hidden="true" /></li>)}</ol></section>

      <section className="principles" aria-labelledby="principles-title"><div className="principles-intro"><span>06 / Built-in standards</span><h2 id="principles-title">Taste with<br /><em>accountability.</em></h2></div><div className="principle-grid"><article><span>01</span><h3>Original by default.</h3><p>References become principles—not copied layouts, assets, or trade dress.</p></article><article><span>02</span><h3>Function before theater.</h3><p>Real routes, data, auth, and failure states survive the redesign.</p></article><article><span>03</span><h3>Access is the art direction.</h3><p>Keyboard, contrast, touch, motion preferences, and performance shape the work.</p></article><article><span>04</span><h3>Evidence over adjectives.</h3><p>Builds, screenshots, interactions, accessibility, and metrics are reported honestly.</p></article></div></section>

      <section className="install" id="install" aria-labelledby="install-title"><span className="install-index">07 / Install</span><h2 id="install-title">Add a studio<br />to your <em>agent.</em></h2><div className="command" role="group" aria-label="Installation command"><code>{installCommand}</code><button type="button" onClick={copyInstall} aria-label="Copy installation command">{copied ? 'Copied' : 'Copy'}</button></div><p className="copy-status" aria-live="polite">{copied ? 'Installation command copied.' : ''}</p><div className="install-actions"><a className="primary-button light" href="https://github.com/RitvikChunamari/rcs-frontend-skill"><span>Open the repository</span><Arrow /></a><a className="text-link" href="#top">Back to top ↑</a></div><p className="install-note">Free and open source · MIT licensed · Built for Claude Code, Codex, Cursor, and compatible AI coding agents.</p></section>
    </main>

    <footer><a className="brand" href="#top"><Mark /><span>RC’S / FRONTEND</span></a><p className="built-credit">This website was built using RC’s Frontend Design Skill.</p><span>2026 / MIT</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
