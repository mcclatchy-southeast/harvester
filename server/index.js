require('dotenv').config()

const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const logger = require('./app/logger')
const router = require('./app/router')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const start = (port = PORT, host = HOST) => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(bodyParser.json())
  app.use(logger)
  app.use(router)

  // static front-end files served by webpack in development
  if (IS_PRODUCTION) {
    app.use(express.static('public'))
  }

  app.use('/assets', createProxyMiddleware({
    target: 'https://interactives.ap.org',
    changeOrigin: true,
  }))

  app.listen(port, host, () => {
    console.log(`Express server listening at http://${host}:${port}`)
  })
}

if (!IS_PRODUCTION) {
  const portfinder = require('portfinder')
  portfinder.basePort = PORT
  portfinder.getPortPromise().then(start)
} else {
  start()
}
