import fs from 'fs'
import express from 'express'
import path from 'path'

const root: string = path.join(__dirname)

const cache = (width: number, height: number, imageName: string): boolean => {
  const resizedImage: string = path.join(
    root,
    `../resizedImage/${imageName}-${width}-${height}.JPG`
  )
  if (fs.existsSync(resizedImage)) {
    console.log('cached image exists ')

    return true
  } else {
    return false
  }
}

const cachedRoute = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const width: number = parseInt(req.query.width as string)
  const height: number = parseInt(req.query.height as string)
  const imageName: string = req.query.imageName as string
  const cached: boolean = cache(width, height, imageName)
  if (cached) {
    res.sendFile(
      path.join(root, `../resizedImage/${imageName}-${width}-${height}.JPG`)
    )
  } else {
    next()
  }
}

export default cachedRoute
