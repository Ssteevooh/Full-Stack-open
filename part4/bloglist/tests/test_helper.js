const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "Full Stack Open Part4",
        author: "Steve Hommy",
        url: "https://www.google.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Test Helper Title",
        author: "Steve Hommy",
        url: "https://www.google.com/",
        likes: 5,
        __v: 0
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB
}