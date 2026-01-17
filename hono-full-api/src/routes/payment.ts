import { Hono } from 'hono'
import db from '../db/index.js'

const payment = new Hono()

payment.get('/', (c) => {
  return c.json(db.prepare('SELECT * FROM Payment').all())
})

payment.post('/', async (c) => {
  const body = await c.req.json()
  const { PaymentDate, Method, Amount, Status } = body

  const result = db.prepare(`
    INSERT INTO Payment (PaymentDate, Method, Amount, Status)
    VALUES (?, ?, ?, ?)
  `).run(PaymentDate, Method, Amount, Status)

  return c.json({ PaymentID: result.lastInsertRowid })
})

export default payment
