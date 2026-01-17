import { Hono } from 'hono'
import db from '../db/index.js'

const shipment = new Hono()

shipment.get('/', (c) => {
  return c.json(db.prepare('SELECT * FROM Shipment').all())
})

shipment.post('/', async (c) => {
  const body = await c.req.json()
  const { ShipDate, Status, TrackingNumber, Destination } = body

  const result = db.prepare(`
    INSERT INTO Shipment (ShipDate, Status, TrackingNumber, Destination)
    VALUES (?, ?, ?, ?)
  `).run(ShipDate, Status, TrackingNumber, Destination)

  return c.json({ ShipmentID: result.lastInsertRowid })
})

export default shipment
