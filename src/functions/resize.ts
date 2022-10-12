import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
//create function to resize an image which is an input to the function

const root: string = path.join(__dirname)
const resize = async (
  imagePath: string,
  width: number,
  height: number,
  imageName: string
): Promise<string | Buffer> => {
  let imageReturn: string | Buffer = ''
  imageReturn = await sharp(imagePath)
    .resize({ width, height })
    .toBuffer()
    .then((data) => {
      // console.log(data)
      fs.writeFileSync(
        path.join(
          root,
          `../../src/resizedImage/${imageName}-${width}-${height}.JPG`
        ),
        data
      )
      return data
    })
    .catch((err) => {
      console.log(err)
      return err
    })

  //console.log("imageReturn:"+imageReturn);

  return imageReturn
}

export default resize
