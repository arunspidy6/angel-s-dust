import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { initDatabase, getProducts, addProduct, updateProduct, deleteProduct } from './db'
import { getOrders, addOrder, updateOrderStatus, deleteOrder } from './api/orders'
import { getMessages, addMessage, deleteMessage } from './api/messages'
import { getReviews, addReview, updateReview, deleteReview } from './api/reviews'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

initDatabase()

// Products
app.get('/api/products', (req, res) => {
  const products = getProducts()
  res.json(products)
})

app.post('/api/products', (req, res) => {
  try {
    const product = addProduct(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.put('/api/products/:id', (req, res) => {
  try {
    const product = updateProduct(req.params.id, req.body)
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.delete('/api/products/:id', (req, res) => {
  try {
    deleteProduct(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

// Orders
app.get('/api/orders', (req, res) => {
  const orders = getOrders()
  res.json(orders)
})

app.post('/api/orders', (req, res) => {
  try {
    const order = addOrder(req.body)
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.put('/api/orders/:id', (req, res) => {
  try {
    const order = updateOrderStatus(req.params.id, req.body.status)
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.delete('/api/orders/:id', (req, res) => {
  try {
    deleteOrder(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

// Messages
app.get('/api/messages', (req, res) => {
  const messages = getMessages()
  res.json(messages)
})

app.post('/api/messages', (req, res) => {
  try {
    const message = addMessage(req.body)
    res.status(201).json(message)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.delete('/api/messages/:id', (req, res) => {
  try {
    deleteMessage(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

// Reviews
app.get('/api/reviews', (req, res) => {
  const reviews = getReviews()
  res.json(reviews)
})

app.post('/api/reviews', (req, res) => {
  try {
    const review = addReview(req.body)
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.put('/api/reviews/:id', (req, res) => {
  try {
    const review = updateReview(req.params.id, req.body)
    res.json(review)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.delete('/api/reviews/:id', (req, res) => {
  try {
    deleteReview(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

app.listen(PORT, () => {
  console.log(`CMS API running on http://localhost:${PORT}`)
})
