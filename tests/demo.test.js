import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateSignal, filterSignals, readSignals, writeSignals, seedSignals, STORAGE_KEY } from '../src/demo/model.js'

test('feedback validation rejects whitespace and explains both required fields', () => {
  assert.deepEqual(validateSignal({ title: '  ', detail: '', source: 'Interview' }), {
    title: 'Add a title between 5 and 100 characters.',
    detail: 'Add context between 10 and 600 characters.',
  })
})
test('search combines a case-insensitive query with decision status', () => {
  const signals = [{ id: 'a', title: 'Share research', detail: 'Export notes', source: 'Interview', decided: true }, { id: 'b', title: 'Share a link', detail: 'Team access', source: 'Support', decided: false }]
  assert.deepEqual(filterSignals(signals, 'SHARE', 'decided').map(s => s.id), ['a'])
})

const valid = { title: 'Valid title', detail: 'A useful customer conversation.', source: 'Interview' }
test('valid trimmed values and exact length boundaries are accepted', () => {
  assert.deepEqual(validateSignal({ ...valid, title: '  abcde  ', detail: '1234567890' }), {})
  assert.deepEqual(validateSignal({ ...valid, title: 'x'.repeat(100), detail: 'y'.repeat(600) }), {})
})
test('oversized content and unknown sources are rejected', () => {
  assert.deepEqual(Object.keys(validateSignal({ title: 'x'.repeat(101), detail: 'y'.repeat(601), source: 'Unknown' })), ['title', 'detail', 'source'])
})
test('malformed field types do not crash validation', () => {
  assert.equal(Object.keys(validateSignal({ title: null, detail: {}, source: 1 })).length, 3)
})
test('search finds content and source, and whitespace alone leaves all signals', () => {
  assert.deepEqual(filterSignals(seedSignals, ' SPREADSHEET ').map(s => s.id), ['s3'])
  assert.equal(filterSignals(seedSignals, 'interview').length, 2)
  assert.equal(filterSignals(seedSignals, '  ').length, 5)
  assert.equal(filterSignals(seedSignals, '', 'open').length, 4)
  assert.equal(filterSignals(seedSignals, 'unfindable').length, 0)
})
test('filtering does not mutate the source array', () => {
  const frozen = Object.freeze(seedSignals.map(s => Object.freeze({ ...s })))
  assert.equal(filterSignals(frozen, '', 'decided').length, 1)
  assert.equal(frozen.length, 5)
})
test('fresh storage loads the sample workspace without an error', () => {
  assert.deepEqual(readSignals({ getItem: () => null }), { signals: seedSignals, error: '' })
})
test('an intentionally empty saved workspace stays empty', () => {
  assert.deepEqual(readSignals({ getItem: () => '[]' }), { signals: [], error: '' })
})
test('corrupt, invalid and duplicate data recover without overwriting storage', () => {
  for (const raw of ['{', '{}', '[null]', JSON.stringify([{ ...seedSignals[0], decided: 'false' }]), JSON.stringify([seedSignals[0], seedSignals[0]])]) {
    const result = readSignals({ getItem: () => raw, setItem: () => assert.fail('must not overwrite') })
    assert.equal(result.signals, seedSignals)
    assert.match(result.error, /not been overwritten/)
  }
})
test('blocked storage is a recoverable read error', () => {
  assert.ok(readSignals({ getItem() { throw new Error('Blocked') } }).error)
})
test('saving uses the isolated demo key and survives a load', () => {
  const map = new Map()
  const storage = { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }
  assert.equal(writeSignals(storage, [seedSignals[0]]).ok, true)
  assert.deepEqual([...map.keys()], [STORAGE_KEY])
  assert.deepEqual(readSignals(storage).signals, [seedSignals[0]])
})
test('a quota failure cannot report a successful save', () => {
  const result = writeSignals({ setItem() { throw new Error('Quota exceeded') } }, seedSignals)
  assert.equal(result.ok, false)
  assert.match(result.error, /input is still here/)
})
