import React, { useEffect, useRef, useState } from 'react'
import './comparison.css'

const capabilities = [
  { name: 'Visual craft', title: 'A complete visual language.', text: 'Typography, hierarchy, spacing, color roles, original graphics, and a deliberate mobile composition.', anchor: 'top', action: 'Explore the interface' },
  { name: 'Working product', title: 'Go beyond the screenshot.', text: 'Search customer signals, filter decisions, inspect the evidence, and add your own validated note. Changes stay in your browser.', anchor: 'workspace', action: 'Try the workspace' },
  { name: 'Motion + depth', title: 'Follow the evidence thread.', text: 'Play, pause, and scrub the six-second story. Rotate its CSS 3D composition or switch to a flat view. Reduced motion is respected.', anchor: 'motion', action: 'Try the motion controls' },
  { name: 'Art direction', title: 'Your direction. Or a considered choice.', text: 'Try Swiss, editorial, or a combination. Read why the product context led to the default. These are authored presets, not live AI generation.', anchor: 'craft', action: 'Explore the directions' },
  { name: 'Interface states', title: 'The moments between the screens.', text: 'Try validation, local saving, empty results, and explicitly labeled loading and error previews with recovery.', anchor: 'workspace', action: 'Explore the states' },
  { name: 'Proof + process', title: 'Design, test, critique, repeat.', text: 'Read the design contract, executable behavior tests, rendered critique, and verification notes in the source. Workflow evidence lives alongside the demo.', anchor: 'craft', action: 'Read the design notes' },
]

export default function Comparison() {
  const base = import.meta.env.BASE_URL
  const [position, setPosition] = useState(50)
  const [mode, setMode] = useState('compare')
  const [device, setDevice] = useState('responsive')
  const [capability, setCapability] = useState(0)
  const [scene, setScene] = useState('top')
  const [width, setWidth] = useState(0)
  const frameRef = useRef(null)
  const active = capabilities[capability]
  useEffect(() => { const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width))); observer.observe(frameRef.current); return () => observer.disconnect() }, [])
  const explore = () => { setScene(active.anchor); setMode('explore'); frameRef.current?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }
  return <div className="demo-workbench">
    <div className="compare-shell">
      <div className="compare-toolbar"><div className="compare-actions" aria-label="Demo mode"><button type="button" aria-pressed={mode === 'compare'} onClick={() => setMode('compare')}>Compare</button><button type="button" aria-pressed={mode === 'explore'} onClick={() => setMode('explore')}>Explore live <span aria-hidden="true">↗</span></button></div><div className="preview-device"><label><span className="visually-hidden">Preview size</span><select aria-label="Preview size" value={device} onChange={e => setDevice(e.target.value)}><option value="responsive">Responsive</option><option value="phone">Phone · 390px</option></select></label><span>{width}px</span></div></div>
      {mode === 'compare' && <div className="comparison-presets" aria-label="Comparison presets"><button aria-pressed={position === 0} onClick={() => setPosition(0)}>Without the skill</button><button aria-pressed={position === 50} onClick={() => setPosition(50)}>Split view</button><button aria-pressed={position === 100} onClick={() => setPosition(100)}>With the skill</button></div>}
      {mode === 'explore' && <div className="live-navigation" aria-label="Explore demo sections">{[['top', 'Overview'], ['workspace', 'Workspace'], ['motion', 'Motion'], ['craft', 'Direction + craft']].map(([id, label]) => <button key={id} onClick={() => setScene(id)} aria-pressed={scene === id}>{label}</button>)}<a href={`${base}comparison/after/index.html#${scene}`} target="_blank" rel="noreferrer">Full screen <span aria-hidden="true">↗</span></a></div>}
      <div className="preview-stage"><div ref={frameRef} className={`compare-viewport ${device === 'phone' ? 'phone-preview' : ''} ${mode === 'explore' ? 'is-live' : ''}`} style={{ '--split': `${position}%` }}>
        {mode === 'compare' ? <>
          <div className="preview-original" inert={true}><iframe title="Original Threadline landing page, visual preview" src={`${base}comparison/before/index.html`} tabIndex="-1" aria-hidden="true" loading="lazy" /></div>
          <div className="after-layer" inert={true}><iframe title="Expanded Threadline with RC’s Frontend Skill, visual preview" src={`${base}comparison/after/index.html?preview`} tabIndex="-1" aria-hidden="true" loading="lazy" /></div>
          <div className="comparison-captions" aria-hidden="true"><span style={{ visibility: position > 22 ? 'visible' : 'hidden' }}>With the skill / Expanded</span><span style={{ visibility: position < 78 ? 'visible' : 'hidden' }}>Without / Original</span></div><div className="compare-seam" aria-hidden="true"><span>↔</span></div>
          <label className="range-label"><span className="visually-hidden">Amount of refined design shown</span><input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-valuetext={`${position}% with the skill`} /></label>
        </> : <iframe key={scene} title="Interactive Threadline demo with RC’s Frontend Skill" src={`${base}comparison/after/index.html#${scene}`} />}
      </div></div>
      <div className="compare-foot"><p>{mode === 'compare' ? 'Drag to compare. Arrow keys adjust; Home / End reveal a side.' : 'The demo is interactive. Scroll inside, or open it full screen.'}</p><div><a href={`${base}comparison/before/index.html`} target="_blank" rel="noreferrer">Open original ↗</a><a href={`${base}comparison/after/index.html`} target="_blank" rel="noreferrer">Open expanded demo ↗</a></div></div>
    </div>
    <div className="capability-guide"><p className="capability-label">EXPLORE THE CAPABILITIES</p><div className="capability-options" aria-label="Skill capabilities">{capabilities.map((item, i) => <button key={item.name} aria-pressed={i === capability} onClick={() => setCapability(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.name}</button>)}</div><div className="capability-detail"><div><h3>{active.title}</h3><p>{active.text}</p></div><button type="button" onClick={explore}>{active.action} <span aria-hidden="true">↗</span></button></div></div>
    <details className="comparison-method"><summary>About this comparison and its scope</summary><p>The original is the archived Threadline landing page. The expanded version was refined with RC’s Frontend Skill and adds new product behavior. This is an illustrative design study, not a controlled same-prompt benchmark. The slider shows appearance; use the live demo to assess behavior.</p><p>The reference demonstrates design, responsive UI, local interaction, motion, and CSS 3D. Research decisions, test-driven development, and critique are documented in the source. Real backend integration and WebGL production workflows are supported by the skill but are outside this local demo’s scope.</p><a href="https://github.com/RitvikChunamari/rcs-frontend-site/tree/main/docs" target="_blank" rel="noreferrer">Inspect the contract and verification ↗</a></details>
  </div>
}
