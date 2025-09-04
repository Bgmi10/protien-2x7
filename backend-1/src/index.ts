import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: "hello from backend asdasd" })
})

export default app
