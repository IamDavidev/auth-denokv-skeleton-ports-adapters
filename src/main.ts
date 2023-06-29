import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { Hono } from 'https://deno.land/x/hono@v3.2.5/hono.ts'
import { app } from './app.ts'

const db = await Deno.openKv()

export const port = 8080


export enum Schemas {
  users = 'users'
}

app.get('/', (c) => {
  return c.json({
    ok: true,
    message: 'Running on Deno Deploy!'
  })
})

app.get('/add-user', async (c) => {

  const mock_id = '111-111'

  const mockDataUser = {
    id: mock_id,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '08123456789',
    address: 'Jl. Raya Bogor KM 30'
  }

  try {
    await db.set([Schemas.users, mock_id], mockDataUser)
    return c.json({
      ok: true,
      message: 'User added successfully',
      data: mockDataUser
    })
  } catch (e: unknown) {
    return c.json({
      ok: false,
      message: 'Error adding user'
    })
  }
})

app.get('/user/:id', async (c) => {
  const paramId = c.req.param('id')

  if (!paramId) return c.json({
    ok: false,
    message: 'User not found'
  })

  const userFound = await db.get(['users', paramId])

  if (!userFound.value) return c.json({
    ok: false,
    message: 'User not found'
  })

  return c.json({
    ok: true,
    message: 'User found',
    data: userFound.value
  })
})

export async function $bootstrap(
  app: Hono<any>,
  port: number,
  abortController: AbortController
):
  Promise<void> {
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
  port,
  new AbortController()
)