import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { Ivanti } from './providers/Ivanti.js'

dotenv.config()

const app = Express()
const port = process.env.PORT || 8081

app.use(Express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.end('<h1>Hola</h1>')
})

app.post('/imports', async (req, res) => {
  try {
    const importResult = await Ivanti.createTickets(req)
    res.json(importResult)
  } catch (err) {
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`[SERVER] : We're online on port ${port}`)
})
