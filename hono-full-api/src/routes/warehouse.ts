import { Hono } from 'hono'
import db from '../db/index.js'

const warehouse = new Hono()

warehouse.get('/', (c) => {
  return c.json(db.prepare('SELECT * FROM Warehouse').all())
})

warehouse.post('/', async (c) => {
  const body = await c.req.json()
  const { Name, Location, Capacity, ManagerName } = body

  const result = db.prepare(`
    INSERT INTO Warehouse (Name, Location, Capacity, ManagerName)
    VALUES (?, ?, ?, ?)
  `).run(Name, Location, Capacity, ManagerName)

  return c.json({ WarehouseID: result.lastInsertRowid })
})

export default warehouse
