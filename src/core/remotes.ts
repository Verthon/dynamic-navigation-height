import { lazy, useState, type ComponentType } from 'react'

// Fakes Module Federation loading a remote over the wire: first the remote's remoteEntry.js (the container),
// then the chunk of the exposed module. Runs on the server too, so the SSR stream sends the skeletons first
// and streams in each micro-frontend's real HTML as its remote "arrives".

/** Simulated network time per request, in ms. Staggered so the micro-frontends stream in one by one. */
export interface RemoteTiming {
  remoteEntry: number
  chunk: number
}

const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const side = typeof window === 'undefined' ? 'server' : 'client'

function fetchRemote<P>(name: string, timing: RemoteTiming, load: () => Promise<{ default: ComponentType<P> }>) {
  return async () => {
    const start = Date.now()
    await wait(timing.remoteEntry)
    console.log(`[mf:${side}] ${name}/remoteEntry.js ${Date.now() - start}ms`)
    await wait(timing.chunk)
    const mod = await load()
    console.log(`[mf:${side}] ${name} exposed chunk ${Date.now() - start}ms`)
    return mod
  }
}

/**
 * A lazy component backed by a fake remote. Created per render tree (not per module) on purpose:
 * a real host caches remoteEntry.js in the server process, but here every request refetches it,
 * so every full load shows the skeletons.
 */
export function useRemote<P>(name: string, timing: RemoteTiming, load: () => Promise<{ default: ComponentType<P> }>) {
  const [Remote] = useState(() => lazy(fetchRemote(name, timing, load)))
  return Remote
}
