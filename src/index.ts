import express from 'express'
import imageRoute from './routes/imageRoute/index'
const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    'Welcome to image processing server, Created by @MazenAlahwani, try to resize any image'
  )
})

app.use('/imageApi', imageRoute)

//listen to port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000')
})

export default app
