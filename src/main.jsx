import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Comparison from './Comparison.jsx'

const disciplines = [
  ['01', 'Research', 'Understand the audience, task, real content, and existing system. Turn references into original decisions.'],
  ['02', 'Direction', 'Follow your direction, combine influences with clear roles, or choose from the product context and explain why.'],
  ['03', 'Design', 'Define hierarchy, responsive states, and acceptance criteria. Review one rendered slice before extending the design.'],
  ['04', 'Build', 'Use unit and component tests for behavior. Run the failing test, implement the change, pass it, then refactor.'],
  ['05', 'Motion + 3D', 'Design purposeful motion with immediate feedback, interruption, cancellation, and reduced-motion alternatives.'],
  ['06', 'Critique + QA', 'Inspect the rendered result, prioritize defects, repair them, and verify the affected views and user flows.'],
]
const designDirections = ['Minimal', 'Editorial', 'Brutalist', 'Retro', 'Aurora', 'Immersive 3D', 'Glass', 'Kinetic', 'Tactile', 'Cyberpunk', 'Clay', 'Swiss']
const directionModes = [
  ['01', 'Set the direction.', 'Name a style, share references, or bring an existing design system. Your direction leads.'],
  ['02', 'Combine influences.', 'Pair directions with a purpose. Swiss structure and editorial imagery can share one coherent system.'],
  ['03', 'Let the brief decide.', 'RC’s considers the audience, task, content, platform, and constraints, then explains its choice.'],
]
const upgrades = [
  ['01', 'Design before code.', 'A design contract defines hierarchy, states, and acceptance criteria. A rendered slice tests the idea early.'],
  ['02', 'Test behavior first.', 'Unit and component tests protect logic and interaction. Test-driven development follows a failing test through a fix and refactor.'],
  ['03', 'Critique, then refine.', 'Findings identify the location, impact, and repair. The agent rechecks the same screen and state after each fix.'],
  ['04', 'Keep the system coherent.', 'New work respects your existing brand and components. Combined styles get distinct roles and shared tokens.'],
  ['05', 'Make interaction resilient.', 'Motion supports the task. Keyboard access, readable type, cancellation, recovery, and reduced motion are part of the design.'],
  ['06', 'Show the evidence.', 'Review test results, screenshots, and remaining gaps. Checks that do not apply need a reason; unrun checks stay visible.'],
]
const installCommand = 'npx skills add RitvikChunamari/rcs-frontend-skill'

function Mark() {
  return <svg className="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 38V10h17c12 0 19 4 19 14S35 38 23 38H6Z" /><path className="mark-cut" d="M19 30h5c4 0 7-2 7-6s-3-6-7-6h-5v12Z" /></svg>
}
function Arrow() { return <span aria-hidden="true">↗</span> }

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101010' : '#f2f2ee')
    try { localStorage.setItem('rcs-swiss-theme', theme) } catch {}
  }, [theme])
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  return <button className="theme-toggle" type="button" onClick={() => setTheme(nextTheme)} aria-label={`Switch to ${nextTheme} mode`} aria-pressed={theme === 'dark'}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" /><path d="M8 3a5 5 0 0 1 0 10Z" fill="currentColor" /></svg><span>{theme === 'light' ? 'Dark' : 'Light'}</span></button>
}


function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
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
    setCopyError(false)
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(installCommand)
      else if (!copyWithSelection()) throw new Error('Copy unavailable')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      let succeeded = false
      try { succeeded = copyWithSelection() } catch {}
      setCopied(succeeded)
      setCopyError(!succeeded)
    }
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
        <div className="hero-copy"><p className="hero-kicker"><span /> Design intelligence / Open source</p><h1 id="hero-title"><span>One skill.</span><strong>Full studio.</strong></h1></div>
        <div className="hero-tool" aria-hidden="true"><div className="tool-head"><span>The practice</span><span>01—06</span></div><ol className="tool-grid">{disciplines.map(([number, title]) => <li key={number}><span>{number}</span><span>{title}</span></li>)}</ol></div>
        <div className="hero-foot"><p>You set the direction—or RC’s chooses from your brief. Design, build, test, critique, and refine in one workflow.</p><a className="primary-button" href="#compare"><span>See the transformation</span><Arrow /></a></div>
        <div className="hero-proof" aria-hidden="true"><span>MIT</span><span>FREE</span><span>OPEN SOURCE</span><span>12 DIRECTIONS</span><span>1 WORKFLOW</span></div>
      </section>

      <section className="manifesto" aria-label="Product statement"><div className="section-index">02 / THESIS</div><p>A practice for AI coding agents.</p><h2>A one-stop <em>UX design skill</em> that thinks before it decorates—and proves before it claims.</h2></section>

      <section className="comparison-section" id="compare" aria-labelledby="compare-title"><header className="section-heading"><span>03 / Transformation</span><h2 id="compare-title">See the craft.<br /><em>Try the difference.</em></h2><p>Compare the original Threadline landing page with an expanded, working reference. Then step inside the design.</p></header><Comparison /></section>

      <section className="workflow" id="workflow" aria-labelledby="workflow-title"><header className="section-heading inverse"><span>04 / One studio</span><h2 id="workflow-title">From loose idea<br />to <em>verified interface.</em></h2></header><ol className="discipline-list">{disciplines.map(([number, title, text]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section className="directions" id="directions" aria-labelledby="directions-title">
        <div className="directions-title">
          <span>05 / Adaptive art direction</span>
          <h2 id="directions-title">Your direction.<br />A combination.<br /><em>Or a considered choice.</em></h2>
          <p>Start with a style or simply describe what you are building. The direction follows the work.</p>
          <ol className="direction-modes">
            {directionModes.map(([number, title, text]) => <li key={number}>
              <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
            </li>)}
          </ol>
        </div>
        <div className="atlas">
          <p className="atlas-label">12 directions to draw from</p>
          <ol className="direction-grid">{designDirections.map((item, index) =>
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><i aria-hidden="true" /></li>
          )}</ol>
          <p className="atlas-note">An existing brand or a bespoke direction can be the better fit. The atlas is a starting point.</p>
        </div>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="principles-intro">
          <span>06 / Upgraded workflow</span>
          <h2 id="principles-title">Intent in the design.<br /><em>Evidence in the delivery.</em></h2>
        </div>
        <div className="principle-grid">{upgrades.map(([number, title, text]) =>
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
        )}</div>
        <p className="workflow-note">RC’s guides your coding agent through these steps using the tools available in your environment.</p>
      </section>

      <section className="install" id="install" aria-labelledby="install-title"><span className="install-index">07 / Install</span><h2 id="install-title">Add a studio<br />to your <em>agent.</em></h2><div className="command" role="group" aria-label="Installation command"><code>{installCommand}</code><button type="button" onClick={copyInstall} aria-label="Copy installation command">{copied ? 'Copied' : 'Copy'}</button></div><p className="copy-status" aria-live="polite">{copied ? 'Installation command copied.' : copyError ? 'Copy unavailable. Select and copy the command above.' : ''}</p><div className="install-actions"><a className="primary-button light" href="https://github.com/RitvikChunamari/rcs-frontend-skill"><span>Open the repository</span><Arrow /></a><a className="text-link" href="#top">Back to top ↑</a></div><p className="install-note">Free and open source · MIT licensed · Built for Claude Code, Codex, Cursor, and compatible AI coding agents.</p></section>
    </main>

    <footer><a className="brand" href="#top"><Mark /><span>RC’S / FRONTEND</span></a><p className="built-credit">This website was built using RC’s Frontend Design Skill.</p><span>2026 / MIT</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
