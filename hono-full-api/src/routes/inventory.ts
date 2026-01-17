import { Hono } from 'hono'
import db from '../db/index.js'

const inventory = new Hono()

inventory.get('/', (c) => {
  return c.json(db.prepare('SELECT * FROM Inventory').all())
})

inventory.post('/', async (c) => {
  const body = await c.req.json()
  const { ProductName, Quantity, LastUpdate, Location } = body

  const result = db.prepare(`
    INSERT INTO Inventory (ProductName, Quantity, LastUpdate, Location)
    VALUES (?, ?, ?, ?)
  `).run(ProductName, Quantity, LastUpdate, Location)

  return c.json({ InventoryID: result.lastInsertRowid })
})

export default inventory // ⭐ ต้องเป็น default
