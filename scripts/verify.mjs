// Fails if core-host and core-remote are not really separate module instances.
import { lstatSync, readdirSync, readFileSync } from 'node:fs'
import { createServer } from 'vite'

const fail = msg => {
  console.error('VERIFY FAILED:', msg)
  process.exit(1)
}

// 1. physical, non-symlinked, identical copy
const HOST = 'src/core-host', REMOTE = 'src/core-remote'
if (lstatSync(REMOTE).isSymbolicLink()) fail('core-remote is a symlink')
const hostFiles = readdirSync(HOST).sort()
const remoteFiles = readdirSync(REMOTE).sort()
if (hostFiles.join() !== remoteFiles.join()) fail('file lists differ; run npm run sync-core')
for (const f of hostFiles) {
  if (lstatSync(`${REMOTE}/${f}`).isSymbolicLink()) fail(`${f} is a symlink`)
  if (readFileSync(`${HOST}/${f}`, 'utf8') !== readFileSync(`${REMOTE}/${f}`, 'utf8'))
    fail(`${f} differs; run npm run sync-core`)
}

// 2. separate module instances: contexts must not be ===
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const host = await vite.ssrLoadModule('/src/core-host/context.ts')
  const remote = await vite.ssrLoadModule('/src/core-remote/context.ts')
  if (!host.CoreContext || !remote.CoreContext) fail('CoreContext export missing')
  if (host.CoreContext === remote.CoreContext) fail('core-host and core-remote share the same context instance')
} finally {
  await vite.close()
}
console.log('verify OK: core-host and core-remote are separate instances (contexts differ)')
