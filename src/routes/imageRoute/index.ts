import express from 'express'
import path from 'path'
import resize from '../../functions/resize'
import { validateSize, validateName } from '../../middleware/validateInput'
import cachedRoute from '../../middleware/cach'
const router: express.Router = express.Router()
const root: string = path.join(__dirname)

//middleware to check if the image name exists and if the user entered valid width and height
router.use(validateSize, validateName)

//check cache first, if image exists cache will send it without creating a new one, else we will continue to resize the image
router.get(
  '/resize',
  cachedRoute,
  async (req: express.Request, res: express.Response):Promise<(express.Response|void)> => {
    //get the image info from query
    const imageName: string = req.query.imageName as string
    const width: number = parseInt(req.query.width as string)
    const height: number = parseInt(req.query.height as string)

    //path to normal image
    const clientImage: string = path.join(root, `../../images/${imageName}.JPG`)
    //path to resized image
    const resizedImage: string = path.join(
      root,
      `../../resizedImage/${imageName}-${width}-${height}.JPG`
    )

    //if the cache middleware did not send the image, we will resize it and send it

    const image: string | Buffer = await resize(
      clientImage,
      width,
      height,
      imageName
    )
    if (image !== 'err') {
      //return res.sendFile(resizedImage)
      return res.status(200).sendFile(resizedImage)
    } else {
      return res.status(400).send('image not resized')
    }
  }
)

export default router
