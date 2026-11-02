import React, { useEffect, useState } from 'react'
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

function Mark() {
  return <svg className="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M7 36V12h15c11 0 18 3 18 12S33 36 22 36H7Z" /><path d="M19 29h4c4 0 7-1 7-5s-3-5-7-5h-4v10Z" /></svg>
}

function Arrow() { return <span aria-hidden="true">↗</span> }

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('rcs-theme', theme)
  }, [theme])

  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return (
    <button className="theme-toggle" type="button" onClick={() => setTheme(nextTheme)} aria-label={`Switch to ${nextTheme} mode`} aria-pressed={theme === 'dark'}>
      <span className="theme-glyph" aria-hidden="true">{theme === 'light' ? '◐' : '☀'}</span>
      <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

function Comparison() {
  const baseUrl = import.meta.env.BASE_URL
  const [position, setPosition] = useState(50)
  return (
    <div className="compare-shell">
      <div className="compare-toolbar">
        <div className="compare-labels" aria-hidden="true"><span>Before</span><span>After</span></div>
        <div className="compare-actions" aria-label="Comparison presets">
          <button type="button" aria-pressed={position === 0} onClick={() => setPosition(0)}>Before</button>
          <button type="button" aria-pressed={position === 100} onClick={() => setPosition(100)}>After</button>
        </div>
      </div>
      <div className="compare-viewport" style={{ '--split': `${position}%` }}>
        <iframe title="Threadline website before RC's Frontend Skill" src={`${baseUrl}comparison/before/index.html`} tabIndex="-1" aria-hidden="true" />
        <div className="after-layer" aria-hidden="true"><iframe title="" src={`${baseUrl}comparison/after/index.html`} tabIndex="-1" /></div>
        <div className="compare-seam" aria-hidden="true"><span>↔</span></div>
        <label className="range-label">
          <span className="visually-hidden">Show after design percentage: {position}%</span>
          <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-valuetext={`${position}% after design`} />
        </label>
      </div>
      <p className="compare-help">Drag the seam · Use arrow keys · Choose a side</p>
    </div>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="RC's Frontend Skill home"><Mark /><span>RC’S / FRONTEND</span></a>
        <nav aria-label="Primary navigation"><a href="#compare">Transformation</a><a href="#workflow">Workflow</a><a href="#install">Install</a></nav>
        <div className="header-actions"><ThemeToggle /><a className="header-cta" href="https://github.com/RitvikChunamari/rcs-frontend-skill">View on GitHub <Arrow /></a></div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-index">[ 01—07 ]</div>
          <p className="hero-kicker">Open-source studio workflow for AI coding agents</p>
          <h1 id="hero-title"><span>One skill.</span><em>Full studio.</em></h1>
          <div className="hero-orbit" aria-hidden="true"><Mark /><i /><i /><i /></div>
          <div className="hero-foot">
            <p>Research, art direction, UX, motion, frontend engineering, accessibility, and release QA—working as one integrated practice.</p>
            <a className="primary-button" href="#compare">See the transformation <Arrow /></a>
          </div>
          <div className="hero-stamp" aria-hidden="true">MIT / FREE / OPEN SOURCE</div>
        </section>

        <section className="manifesto" aria-label="Product statement">
          <p>Not another component library.</p>
          <h2>A one-stop <em>UX design skill</em> that thinks before it decorates—and proves before it claims.</h2>
        </section>

        <section className="comparison-section" id="compare" aria-labelledby="compare-title">
          <header className="section-heading"><span>02 / Transformation</span><h2 id="compare-title">Same brief.<br /><em>Different standard.</em></h2><p>The real Threadline landing page, before and after the complete RC’s Frontend workflow.</p></header>
          <Comparison />
        </section>

        <section className="workflow" id="workflow" aria-labelledby="workflow-title">
          <header className="section-heading inverse"><span>03 / One studio</span><h2 id="workflow-title">From loose idea<br />to <em>verified interface.</em></h2></header>
          <ol className="discipline-list">
            {disciplines.map(([number, title, text]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">↗</i></li>)}
          </ol>
        </section>

        <section className="directions" aria-labelledby="directions-title">
          <div className="directions-title"><span>04 / Art direction atlas</span><h2 id="directions-title">Twelve directions.<br />One coherent choice.</h2></div>
          <div className="direction-wheel" aria-hidden="true"><div className="wheel-core"><Mark /></div>{designDirections.map((item, index) => <span key={item} style={{ '--i': index }}>{item}</span>)}</div>
          <ul className="direction-mobile">{designDirections.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="principles-intro"><span>05 / Built-in standards</span><h2 id="principles-title">Taste with<br /><em>accountability.</em></h2></div>
          <div className="principle-grid">
            <article><span>01</span><h3>Original by default.</h3><p>References become principles—not copied layouts, assets, or trade dress.</p></article>
            <article><span>02</span><h3>Function before theater.</h3><p>Real routes, data, auth, and failure states survive the redesign.</p></article>
            <article><span>03</span><h3>Access is the art direction.</h3><p>Keyboard, contrast, touch, motion preferences, and performance shape the work.</p></article>
            <article><span>04</span><h3>Evidence over adjectives.</h3><p>Builds, screenshots, interactions, accessibility, and metrics are reported honestly.</p></article>
          </div>
        </section>

        <section className="install" id="install" aria-labelledby="install-title">
          <span className="install-index">06 / Install</span>
          <h2 id="install-title">Add a studio<br />to your <em>agent.</em></h2>
          <div className="command" role="group" aria-label="Installation command"><code>npx skills add RitvikChunamari/rcs-frontend-skill</code></div>
          <div className="install-actions"><a className="primary-button light" href="https://github.com/RitvikChunamari/rcs-frontend-skill">Open the repository <Arrow /></a><a className="text-link" href="#top">Back to top ↑</a></div>
          <p className="install-note">Free and open source · MIT licensed · Built for Claude Code, Codex, Cursor, and compatible AI coding agents.</p>
        </section>
      </main>

      <footer><a className="brand" href="#top"><Mark /><span>RC’S / FRONTEND</span></a><p className="built-credit">This website was built using RC’s Frontend Design Skill.</p><span>2026 / MIT</span></footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
