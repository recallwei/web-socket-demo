import express from 'express'
import expressWs from 'express-ws'

const app = express()
expressWs(app)
const PORT = 3333

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const rooms = {
  1: [],
  2: [],
  3: []
}

app.ws('/:roomId', (ws, req) => {
  rooms[req.params.roomId].push(ws)
  ws.on('message', (message) => {
    const messageObj = JSON.parse(message)
    console.log(messageObj.roomId, messageObj.userId, messageObj.msg)
    rooms[messageObj.roomId].forEach((client) => {
      client.send(message)
    })
  })
})

app.listen(PORT, () => {
  console.log(`正在监听端口： ${PORT}`)
})
