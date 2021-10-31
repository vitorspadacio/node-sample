import app from './app'

const port = process.env.PORT || 1234
app.listen(port)

console.info('Server has started!  🚀')
console.info(`Listening port: http://localhost:${port}`)
