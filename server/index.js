const db = require('./Config/DbConnection');
const express = require('express');
const cors = require('cors');
const AuthRoutes = require('./Routes/AuthRoutes');
const TodoRoutes = require('./Routes/TodoRoutes');
let saleOrderRoutes= require('./Routes/saleOrder')
let productRoutes= require('./Routes/productsRoutes')
const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
  methods: ["POST", "GET", "DELETE", "PUT", "PATCH"]
}))
app.use(express.json());
app.use('/api', AuthRoutes);
app.use('/api', TodoRoutes);
app.use('/api', productRoutes)
app.use('/api', saleOrderRoutes)

app.listen(5500, () => { console.log('server is listening on port 5500') });