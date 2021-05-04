const favController = require('../../../src/controllers/favs.controller')
const { User, Photo } = require('../../../src/models')
const config = require('config')
const mongoose = require('mongoose')
describe('Favs Controller Add fav', () => {
    let req
    let next
    let res
    beforeEach(async () => {
        await mongoose.connect(config.get('db'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        await mongoose.connection.dropDatabase()
        req = { headers: {}, params: {}, body: {} }
        req.headers.token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODgzNDUzNmRlMTM2MzI5MDM3MDFiNyJ9.dOWzfn2laD5YWqfgKhbFgk17_cCCbkW4K6lN6CV8GSg'
        res = {
            locals: {},
            response: null,
            statusCode: 0,
            status: function (code) {
                this.statusCode = code
                return this
            },
            json: function (data) {
                this.response = data
            },
        }
        user = new User({
            _id: '608834536de13632903701b7',
            email: 'test@test.com',
            Fname: 'test',
            Lname: 'test',
            username: 'test',
            about: 'test',
            date_joined: Date.now(),
            age: 50,
            Fav: [],
        })
        await user.save()
        photo = new Photo({
            _id: '608834536de13632903701b7',
            title: 'url',
            url: 'url',
            description: 'desc',
            Fav: [],
        })
        await photo.save()
    })
    describe('Add to Favs with no photoId', () => {
        it('Should Fail when req contains no photoId', async () => {
            await favController.add_fav(req, res)
            expect(res.statusCode).toBe(422)
            expect(res.response.message).toBe('Missing photo parameter')
        })
    })
    describe('Add to Favs with photo that doesnt exist', () => {
        it('Should Fail when req contains an incorrect photoId', async () => {
            req.body.photo_id = '608834536de13632903701b9'
            await favController.add_fav(req, res)
            expect(res.statusCode).toBe(404)
            expect(res.response.message).toBe('Photo not found')
        })
    })
    describe('Add to Favs successful request', () => {
        it('Should succeed', async () => {
            req.body.photo_id = '608834536de13632903701b7'
            await favController.add_fav(req, res)
            expect(res.statusCode).toBe(200)
            expect(res.response.message).toBe(
                'Photo added to favourites list successfully'
            )
        })
    })
    describe('Add photo to favourites which is already in favourites', () => {
        it('Should fail with error 500', async () => {
            req.body.photo_id = '608834536de13632903701b7'
            await favController.add_fav(req, res)
            await favController.add_fav(req, res)
            expect(res.statusCode).toBe(500)
            expect(res.response.message).toBe('Photo is already in favorites')
        })
    })
})

describe('Favs Controller Remove Fav', () => {
    let req
    let next
    let res
    beforeEach(async () => {
        await mongoose.connect(config.get('db'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        await mongoose.connection.dropDatabase()
        req = { headers: {}, params: {} }
        req.headers.token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODgzNDUzNmRlMTM2MzI5MDM3MDFiNyJ9.dOWzfn2laD5YWqfgKhbFgk17_cCCbkW4K6lN6CV8GSg'
        res = {
            locals: {
                userid: '608834536de13632903701b7',
            },
            response: null,
            statusCode: 0,
            status: function (code) {
                this.statusCode = code
                return this
            },
            json: function (data) {
                this.response = data
            },
        }
        user = new User({
            _id: '608834536de13632903701b7',
            email: 'test@test.com',
            Fname: 'test',
            Lname: 'test',
            username: 'test',
            about: 'test',
            date_joined: Date.now(),
            age: 50,
            Fav: ['608834536de13632903701b7'],
        })
        await user.save()
        photo = new Photo({
            _id: '608834536de13632903701b7',
            title: 'url',
            url: 'url',
            description: 'desc',
            Fav: ['608834536de13632903701b7'],
        })
        photoNoFav = new Photo({
            _id: '608834536de13632903701b5',
            title: 'url',
            url: 'url',
            description: 'desc',
            Fav: [],
        })
        await photo.save()
        await photoNoFav.save()
    })
    describe('Remove from favs no photoId', () => {
        it('Should Fail when req contains no photoId', async () => {
            await favController.remove_fav(req, res)
            expect(res.statusCode).toBe(422)
            expect(res.response.message).toBe('Missing photo parameter')
        })
    })
    describe('Remove from Favs with photo that doesnt exist', () => {
        it('Should Fail when req contains an incorrect photoId', async () => {
            req.params.photoid = '608834536de13632903701b9'
            await favController.remove_fav(req, res)
            expect(res.statusCode).toBe(404)
            expect(res.response.message).toBe('Photo not found')
        })
    })
    describe('Remove photo that is not on favs list', () => {
        it('Should fail as photo is not favourite', async () => {
            req.params.photoid = '608834536de13632903701b5'
            await favController.remove_fav(req, res)
            expect(res.statusCode).toBe(500)
            expect(res.response.message).toBe('Photo not in favourites list')
        })
    })
    describe('Remove photo Successfully', () => {
        it('Should successfully remove photo', async () => {
            req.params.photoid = '608834536de13632903701b7'
            await favController.remove_fav(req, res)
            expect(res.statusCode).toBe(200)
            expect(res.response.message).toBe(
                'Photo deleted from favourites list and removed from likes'
            )
        })
    })
})