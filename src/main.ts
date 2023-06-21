import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { Hono } from 'https://deno.land/x/hono@v3.2.5/hono.ts'
import { app } from './app.ts'


// export function generateUUID(): string {
//     return crypto.randomUUID()
// }
//
// const db = await Deno.openKv();

export const port = 8080

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: 'Running on Deno Deploy!'
  })
})

export async function $bootstrap(
  app: Hono<any>,
  abortController: AbortController,
  port: number
): Promise<void> {
  try {
    await serve(app.fetch, {
      port: port,
      signal: abortController.signal,
      onListen: (): void => {
        console.log(`Listening on ${port}`)
      }
    })
  } catch (_e: unknown) {
    abortController.abort()
    console.log('Server aborted due to error')
  }
}

await $bootstrap(
  app,
  new AbortController(),
  port
)