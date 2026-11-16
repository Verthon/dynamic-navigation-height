// Copy the parts of core the micro-frontends use into src/micro-frontends/core-copy.
// Simulates each micro-frontend bundling its own core (core is not in Module Federation `shared`).
import { cpSync, mkdirSync, rmSync } from 'node:fs'

const FILES = ['Box.tsx', 'heights.ts']
const SRC = 'src/core', DEST = 'src/micro-frontends/core-copy'

rmSync(DEST, { recursive: true, force: true })
mkdirSync(DEST, { recursive: true })
for (const f of FILES) cpSync(`${SRC}/${f}`, `${DEST}/${f}`)
console.log(`${DEST} synced from ${SRC}`)
