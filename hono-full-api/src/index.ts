import { Hono } from 'hono'

import invoice from './routes/invoice'
import payment from './routes/payment'
import shipment from './routes/shipment'
import warehouse from './routes/warehouse'
import inventory from './routes/inventory'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>API Examples</title>
<style>
  body { font-family: Consolas, monospace; background:#0f172a; color:#e5e7eb; padding:20px }
  h1, h2 { color:#38bdf8 }
  .block { background:#020617; padding:15px; margin-bottom:25px; border-radius:8px }
  .method { color:#22c55e }
  .url { color:#60a5fa }
  pre { background:#020617; color:#e5e7eb }
</style>
</head>
<body>

<h1>📘 CRUD API – Example Usage</h1>

<!-- Invoice -->
<h2>Invoice</h2>

<div class="block">
<span class="method">POST</span>
<span class="url"> http://localhost:3000/invoice</span>
<pre>
{
  "InvoiceDate": "2026-01-17",
  "Amount": 5000,
  "Status": "Unpaid",
  "DueDate": "2026-01-31"
}
</pre>
</div>

<div class="block">
<span class="method">GET</span>
<span class="url"> http://localhost:3000/invoice</span>
</div>

<!-- Payment -->
<h2>Payment</h2>

<div class="block">
<span class="method">POST</span>
<span class="url"> http://localhost:3000/payment</span>
<pre>
{
  "PaymentDate": "2026-01-18",
  "Method": "Credit Card",
  "Amount": 5000,
  "Status": "Paid"
}
</pre>
</div>

<div class="block">
<span class="method">GET</span>
<span class="url"> http://localhost:3000/payment</span>
</div>

<!-- Shipment -->
<h2>Shipment</h2>

<div class="block">
<span class="method">POST</span>
<span class="url"> http://localhost:3000/shipment</span>
<pre>
{
  "ShipDate": "2026-01-19",
  "Status": "Shipped",
  "TrackingNumber": "TH123456789",
  "Destination": "Bangkok"
}
</pre>
</div>

<div class="block">
<span class="method">GET</span>
<span class="url"> http://localhost:3000/shipment</span>
</div>

<!-- Warehouse -->
<h2>Warehouse</h2>

<div class="block">
<span class="method">POST</span>
<span class="url"> http://localhost:3000/warehouse</span>
<pre>
{
  "Name": "Main Warehouse",
  "Location": "Chiang Mai",
  "Capacity": 1000,
  "ManagerName": "Somchai"
}
</pre>
</div>

<div class="block">
<span class="method">GET</span>
<span class="url"> http://localhost:3000/warehouse</span>
</div>

<!-- Inventory -->
<h2>Inventory</h2>

<div class="block">
<span class="method">POST</span>
<span class="url"> http://localhost:3000/inventory</span>
<pre>
{
  "ProductName": "Laptop",
  "Quantity": 50,
  "LastUpdate": "2026-01-17",
  "Location": "Main Warehouse"
}
</pre>
</div>

<div class="block">
<span class="method">GET</span>
<span class="url"> http://localhost:3000/inventory</span>
</div>

<p>🚀 API Server is running</p>

</body>
</html>
`)
})

app.route('/invoice', invoice)
app.route('/payment', payment)
app.route('/shipment', shipment)
app.route('/warehouse', warehouse)
app.route('/inventory', inventory)

export default app
