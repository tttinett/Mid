import { Hono } from 'hono'
import db from '../db/index.js'

const invoice = new Hono()

// CREATE
invoice.post('/', async (c) => {
  const body = await c.req.json()
  const { InvoiceDate, Amount, Status, DueDate } = body

  const result = db.prepare(`
    INSERT INTO Invoice (InvoiceDate, Amount, Status, DueDate)
    VALUES (?, ?, ?, ?)
  `).run(InvoiceDate, Amount, Status, DueDate)

  return c.json({ InvoiceID: result.lastInsertRowid })
})

// READ ALL
invoice.get('/', (c) => {
  const data = db.prepare('SELECT * FROM Invoice').all()
  return c.json(data)
})

// READ BY ID
invoice.get('/:id', (c) => {
  const id = Number(c.req.param('id'))
  const data = db.prepare(
    'SELECT * FROM Invoice WHERE InvoiceID = ?'
  ).get(id)

  if (!data) return c.json({ message: 'Not found' }, 404)
  return c.json(data)
})

// UPDATE
invoice.put('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()

  db.prepare(`
    UPDATE Invoice
    SET InvoiceDate=?, Amount=?, Status=?, DueDate=?
    WHERE InvoiceID=?
  `).run(body.InvoiceDate, body.Amount, body.Status, body.DueDate, id)

  return c.json({ message: 'Updated' })
})

// DELETE
invoice.delete('/:id', (c) => {
  const id = Number(c.req.param('id'))
  db.prepare('DELETE FROM Invoice WHERE InvoiceID=?').run(id)
  return c.json({ message: 'Deleted' })
})

export default invoice
