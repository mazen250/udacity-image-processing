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
  const regExp = /[a-zA-Z]/g;
  const regex = /\W|_/g
  const tempwidth: string = req.query.width as string
  const tempheight: string = req.query.height as string
  if (regExp.test(tempwidth) || regExp.test(tempheight )|| regex.test(tempwidth) || regex.test(tempheight)) {
    res.status(400).send('valid input is numbers only,remove any letters and special charachters')
  }
  else{
    const width:number = parseInt(tempwidth as string)
    const height:number = parseInt(tempheight as string)
    console.log('width:' + width+ ' height:' + height);
    if (
      width > 0 &&
      height > 0 &&
      typeof width === 'number' &&
      typeof height === 'number'
    ) {
      console.log('valid width and height')
  
      next()
    } else {
      res.send(
        'please enter valid width and height, width and height must be numbers and greater than 0'
      )
    }
  }

  
}

//check if image exists in images folder
const validateName = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const imageName: string = req.query.imageName as string

  const clientImage: string = path.join(
    root,
    `../images/${req.query.imageName as string}.JPG`
  )
  if (fs.existsSync(clientImage)) {
    console.log('image name existed')
    next()
  } else {
    res.status(400).send('image name ' + imageName + ' does not exist , the valid imageName is gym , coffee and mazen')
  }
}

export { validateSize, validateName }
