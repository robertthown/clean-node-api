import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { default: setupRoutes } = await import('./config/routes')
    const express = await import('express')
    const app = express.default()
    setupRoutes(app)
    app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
  })
  .catch(console.error)
