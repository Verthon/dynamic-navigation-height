// Re-create src/core-remote as a physical copy of src/core-host.
import { cpSync, rmSync } from 'node:fs'
rmSync('src/core-remote', { recursive: true, force: true })
cpSync('src/core-host', 'src/core-remote', { recursive: true })
console.log('core-remote synced from core-host')
