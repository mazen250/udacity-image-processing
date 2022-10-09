import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

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
