import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import { ServerStyleSheet } from 'styled-components'
import App from './App'

// styled-components reads its nonce from this global.
declare global {
  var __webpack_nonce__: string | undefined
}

export function render(url: string, nonce: string): Promise<{ html: string; head: string }> {
  globalThis.__webpack_nonce__ = nonce
  const sheet = new ServerStyleSheet()
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk))
        cb()
      },
      final(cb) {
        const html = Buffer.concat(chunks).toString('utf-8')
        const head = sheet.getStyleTags()
        sheet.seal()
        resolve({ html, head })
        cb()
      },
    })
    const { pipe } = renderToPipeableStream(
      sheet.collectStyles(
        <StrictMode>
          <App url={url} />
        </StrictMode>,
      ),
      {
        // wait for lazy remotes so they are part of the server HTML
        onAllReady: () => pipe(sink),
        onError: reject,
      },
    )
  })
}
