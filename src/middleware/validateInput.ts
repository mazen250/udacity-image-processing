//create a function that validates the input
import express from 'express'
import path from 'path'
import fs from 'fs'
const root: string = path.join(__dirname)

const validateSize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const width: number = parseInt(req.query.width as string)
  const height: number = parseInt(req.query.height as string)
  if (width > 0 && height > 0 && typeof width === 'number' && typeof height === 'number') {
    console.log("valid width and height")

    next()
  } else {
    res.status(400).send('please enter valid width and height, width and height must be numbers and greater than 0')
  }
}

//check if image exists in images folder
const validateName = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const imageName: string = req.query.imageName as string

  const clientImage: string = path.join(root, `../images/${imageName}.JPG`)
  if (fs.existsSync(clientImage)) {
    console.log('image name existed')
    next()
  } else {
    res.status(400).send('image name does not exist')
  }
}

export { validateSize, validateName }
