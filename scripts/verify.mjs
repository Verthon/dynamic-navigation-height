// Fails if the micro-frontends' core copy is symlinked or drifted from core.
import { lstatSync, readdirSync, readFileSync } from 'node:fs'

const fail = msg => {
  console.error('VERIFY FAILED:', msg)
  process.exit(1)
}

// physical (not symlinked) copy, identical to core
const CORE = 'src/core', COPY = 'src/micro-frontends/core-copy'
if (lstatSync(COPY).isSymbolicLink()) fail('core-copy is a symlink')
for (const f of readdirSync(COPY)) {
  if (lstatSync(`${COPY}/${f}`).isSymbolicLink()) fail(`${f} is a symlink`)
  if (readFileSync(`${CORE}/${f}`, 'utf8') !== readFileSync(`${COPY}/${f}`, 'utf8'))
    fail(`${f} differs; run npm run sync-core`)
}
console.log('verify OK: core-copy matches core')
