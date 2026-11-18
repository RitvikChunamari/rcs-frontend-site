export const STORAGE_KEY = 'threadline-studio-v1'
export const sources = ['Interview', 'Support', 'Survey', 'Product request']
export const seedSignals = [
  { id: 's1', title: 'Keep the context with the decision', detail: 'When an insight reaches planning, the original customer conversation gets lost. I want to understand why we chose something six weeks later.', source: 'Interview', theme: 'Research continuity', decided: false },
  { id: 's2', title: 'One place for the recurring requests', detail: 'The same request arrives in support, sales calls, and our survey. Connecting those signals would help us spot a pattern earlier.', source: 'Support', theme: 'Connected evidence', decided: false },
  { id: 's3', title: 'Share the why, not another spreadsheet', detail: 'A short decision record with the supporting evidence would give the wider team enough context without another meeting.', source: 'Survey', theme: 'Research continuity', decided: true },
  { id: 's4', title: 'Make space for the quieter signals', detail: 'A low-volume request can still be important. Let us read and compare the evidence before we prioritize by count.', source: 'Interview', theme: 'Thoughtful prioritization', decided: false },
  { id: 's5', title: 'Find the conversation I remember', detail: 'I remember the customer explaining the problem, but not which tool the note lives in. Search across the content and its source.', source: 'Product request', theme: 'Connected evidence', decided: false },
]
export function validateSignal({ title = '', detail = '', source } = {}) {
  const errors = {}
  if (typeof title !== 'string' || title.trim().length < 5 || title.trim().length > 100) errors.title = 'Add a title between 5 and 100 characters.'
  if (typeof detail !== 'string' || detail.trim().length < 10 || detail.trim().length > 600) errors.detail = 'Add context between 10 and 600 characters.'
  if (!sources.includes(source)) errors.source = 'Choose a source from the list.'
  return errors
}
export function filterSignals(signals, query = '', status = 'all') {
  const normalized = query.trim().toLocaleLowerCase()
  return signals.filter(s => (status === 'all' || (status === 'decided' ? s.decided : !s.decided)) && `${s.title} ${s.detail} ${s.source} ${s.theme}`.toLocaleLowerCase().includes(normalized))
}
export function readSignals(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return { signals: seedSignals, error: '' }
    const data = JSON.parse(raw)
    if (!Array.isArray(data) || data.length > 100 || new Set(data.map(s => s?.id)).size !== data.length || !data.every(s => s && typeof s.id === 'string' && typeof s.theme === 'string' && typeof s.decided === 'boolean' && Object.keys(validateSignal(s)).length === 0)) throw new Error('Invalid saved data')
    return { signals: data, error: '' }
  } catch { return { signals: seedSignals, error: 'Saved signals could not be loaded. Sample data is shown; your stored data has not been overwritten.' } }
}
export function writeSignals(storage, signals) {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(signals)); return { ok: true, error: '' } }
  catch { return { ok: false, error: 'This browser could not save your changes. Your input is still here. Allow local storage or try again.' } }
}
