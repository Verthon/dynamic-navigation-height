import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Transform } from 'node:stream'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import App from './App'

interface RenderCallbacks {
  /** The shell (layout + skeletons) is ready; micro-frontends stream into `stream` as their remotes arrive. */
  onShellReady(stream: Transform): void
  onShellError(error: unknown): void
}

const ABORT_AFTER_MS = 10_000

/**
 * Streaming SSR: sends the shell with the skeletons first, then each micro-frontend's real HTML as its
 * fake remote resolves (React swaps it in with an inline script). Each chunk is preceded by the styles
 * collected since the previous one; on the client styled-components moves them into <head> before hydration.
 */
export function render(url: string, nonce: string, { onShellReady, onShellError }: RenderCallbacks) {
  globalThis.__webpack_nonce__ = nonce
  const sheet = new ServerStyleSheet()
  const { pipe, abort } = renderToPipeableStream(
    sheet.collectStyles(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
    ),
    {
      nonce,
      onShellReady() {
        // Same idea as sheet.interleaveWithNodeStream, which can't be used here: under Vite dev it loads the
        // ESM build of styled-components, whose require('stream') throws.
        const withStyles = new Transform({
          transform(chunk, _encoding, done) {
            const styles = sheet.getStyleTags()
            sheet.instance.clearTag()
            done(null, styles + chunk)
          },
          flush(done) {
            sheet.seal()
            done()
          },
        })
        pipe(withStyles)
        onShellReady(withStyles)
      },
      onShellError,
      onError(error) {
        console.error(error)
      },
    },
  )
  setTimeout(abort, ABORT_AFTER_MS)
}
