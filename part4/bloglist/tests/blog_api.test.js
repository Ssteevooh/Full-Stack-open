const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('Blog API GET Requests', () => {
    test('Return blogs as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('A specific title is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain('Full Stack Open Part4')
    })

    test('Verify the existence of the id property', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('Blog API POST Requests', () => {
    test('Successfully creates a new blog post', async () => {
        const newBlog = {
            _id: "5a422aa71b54a676236d28f7",
            title: 'New title',
            author: 'Steve Hommy',
            url: 'https://www.google.com/',
            likes: '10',
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInEnd = await helper.blogsInDB()
        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsInEnd.map(blog => blog.title)
        expect(titles).toContain('New title')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})