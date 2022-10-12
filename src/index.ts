import express from 'express'
import imageRoute from './routes/imageRoute/index'
const app: express.Application = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    'Welcome to image processing server, Created by @MazenAlahwani, try to resize any image'
  )
})

app.get('/test?name=mazen', (req: express.Request, res: express.Response) => {
  if (req.query.name === 'mazen') {
    res.status(200).send('welcome mazen')
  } else {
    res.status(400).send('welcome guest')
  }
})

app.use('/imageApi', imageRoute)

//listen to port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000')
})

export default app
