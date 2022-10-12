import app from '../index'
import supertest from 'supertest'
import resize from '../functions/resize'
import path from 'path'

const request = supertest(app)
const root = path.resolve(__dirname)

//test the root route
describe('Test the root path', () => {
  describe('Test the root path', () => {
    it('It should return a text that i wrote', async () => {
      const response = await request.get('/')
      const res = response.text
      expect(res).toBe(
        'Welcome to image processing server, Created by @MazenAlahwani, try to resize any image'
      )
    })
  })
})

//start of testing the resize route with not valid inputs
describe('Test the resize route with not valid image name and not valid width and height', () => {
  describe('Test the resize route with not valid image name', () => {
    it('It should return a status 400', async () => {
      const response = await request.get(
        '/imageApi/resize?imageName=0&width=300&height=300'
      )

      const res = response.status
      expect(res).toBe(400)
    })
  })
  describe('Test the resize route with not valid width and height', () => {
    it('It should return please enter valid width and height, width and height must be numbers and greater than 0', async () => {
      const response = await request.get(
        '/imageApi/resize?imageName=coffee&width=0&height=0'
      )

      const res = response.text
      expect(res).toBe(
        'please enter valid width and height, width and height must be numbers and greater than 0'
      )
    })
  })
})
//end of testing the resize route with not valid inputs

//start of testing resize function and cache function
describe('Test cache and resize', () => {
  describe('Test the resize function', () => {
    it('It should return a buffer', async () => {
      const image = await resize(
        path.join(root, '../../src/images/mazen.JPG'),
        500,
        500,
        'testing'
      )
      //console.log("image:"+image);
      expect(image).toBeInstanceOf(Buffer)
    })
  })
  describe('Test cache', () => {
    it('It should return the buffer without creating a new image ', async () => {
      const image = await resize(
        path.join(root, '../../src/images/mazen.JPG'),
        500,
        500,
        'testing'
      )
      //console.log("image:"+image);
      expect(image).toBeInstanceOf(Buffer)
    })
  })
})
//end of testing resize function and cache function