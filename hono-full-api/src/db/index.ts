import Database from 'better-sqlite3'

const db = new Database('database.db')

// init tables
db.exec(`
CREATE TABLE IF NOT EXISTS Invoice (
  InvoiceID INTEGER PRIMARY KEY AUTOINCREMENT,
  InvoiceDate TEXT,
  Amount REAL,
  Status TEXT,
  DueDate TEXT
);

CREATE TABLE IF NOT EXISTS Payment (
  PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
  PaymentDate TEXT,
  Method TEXT,
  Amount REAL,
  Status TEXT
);

CREATE TABLE IF NOT EXISTS Shipment (
  ShipmentID INTEGER PRIMARY KEY AUTOINCREMENT,
  ShipDate TEXT,
  Status TEXT,
  TrackingNumber TEXT,
  Destination TEXT
);

CREATE TABLE IF NOT EXISTS Warehouse (
  WarehouseID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  Location TEXT,
  Capacity INTEGER,
  ManagerName TEXT
);

CREATE TABLE IF NOT EXISTS Inventory (
  InventoryID INTEGER PRIMARY KEY AUTOINCREMENT,
  ProductName TEXT,
  Quantity INTEGER,
  LastUpdate TEXT,
  Location TEXT
);
`)

export default db
