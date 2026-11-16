import fs from 'node:fs/promises'
import express from 'express'
import { randomBytes } from 'node:crypto'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Architecture docs: markdown rendered as plain text in the browser
app.use(`${base}docs`, express.static('./docs', {
  setHeaders: res => res.type('text/plain; charset=utf-8'),
}))

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const nonce = randomBytes(16).toString('base64')
    const [head, tail] = template
      .replaceAll('<script type="module"', `<script nonce="${nonce}" type="module"`)
      .split('<!--app-html-->')

    // Stream: shell with skeletons first, micro-frontends as their remotes arrive, then the client script.
    render('/' + url, nonce, {
      onShellReady(stream) {
        res.status(200).set({ 'Content-Type': 'text/html' })
        res.write(head)
        stream.on('data', chunk => {
          res.write(chunk)
          res.flush?.() // compression buffers otherwise
        })
        stream.on('end', () => res.end(tail))
        stream.on('error', e => {
          console.error(e)
          res.end()
        })
      },
      onShellError(e) {
        console.error(e)
        res.status(500).end(String(e))
      },
    })
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
