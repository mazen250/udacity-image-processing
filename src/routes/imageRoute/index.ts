import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
const router: express.Router = express.Router()
const root: string = path.join(__dirname)

router.get('/resize', (req: express.Request, res: express.Response) => {
  // Get the image name from the query string
  const imageName: string = req.query.imageName as string

  console.log('image name', imageName)
  //const pp:string = path.join(root,`../../images/${imageName}`)
  const clientImage: string = path.join(root, `../../images/${imageName}.JPG`)
  //copy image to another file 
  fs.copyFile(clientImage, path.join(root, `../../resizedImage/${imageName}-copy.JPG`))

  res.sendFile(clientImage)
})

export default router
