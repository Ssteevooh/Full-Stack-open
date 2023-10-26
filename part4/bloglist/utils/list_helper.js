const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((prev, curr) => {
        return prev.likes > curr.likes ? prev : curr
    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const countBlogs = _(blogs)
        .groupBy('author')
        .map((objs, keys) => ({
            'author': keys,
            'blogs': objs.length
        }))
        .value()

    const authorWithMostBlogs = _.maxBy(countBlogs, 'blogs')

    return authorWithMostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}