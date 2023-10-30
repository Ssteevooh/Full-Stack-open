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

    test('Verify the existence of the "id" property', async () => {
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

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain('New title')
    })

    test('Blog without "likes" property defaults to 0', async () => {
        const newBlog = {
            _id: "5a422aa71b54a676236d28f7",
            title: 'New title',
            author: 'Steve Hommy',
            url: 'https://www.google.com/',
            __v: 0
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const addedBlog = response.body
        expect(addedBlog.likes).toBe(0)

        const blogInDB = await Blog.findById(addedBlog.id)
        expect(blogInDB.likes).toBe(0)
    })

    test('Blog without "title" properties responds status 400', async () => {
        const newBlog = {
            _id: "5a422aa62b54a676234d17f9",
            author: "Steve Hommy",
            url: "https://www.google.com/",
            likes: 5,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('Blog without "url" properties responds status 400', async () => {
        const newBlog = {
            _id: "5a422aa62b54a676234d17f9",
            title: 'New title',
            author: "Steve Hommy",
            likes: 5,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('Blog API DELETER Request', () => {
    test('Deleting a single blog with status code 204 if id is valid', async () => {
        const blogAtStart = await helper.blogsInDB()
        const blogToDelete = blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Blog API PUT Request', () => {
    test('Updating the information of an individual blog post', async () => {
        const blogAtStart = await helper.blogsInDB()
        const blogToUpdate = blogAtStart[0]

        const updatedBlog = {
            title: "Updated title",
            author: "Steve Hommy",
            url: "https://www.updatedurl.com/",
            likes: "15"
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDB()
        expect(response.body.title).toBe(updatedBlog.title)
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})