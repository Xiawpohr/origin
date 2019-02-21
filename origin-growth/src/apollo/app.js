/*
 * Implementation of the Origin Growth GraphQL server.
 * Uses the Apollo framework: https://www.apollographql.com/server
 */
require('dotenv').config()

try {
  require('envkey')
} catch (error) {
  console.log('EnvKey not configured')
}

const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const promBundle = require('express-prom-bundle')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const app = express()
app.use(cors())

const bundle = promBundle({
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000
    }
  }
})
app.use(bundle)

// Start ApolloServer by passing type definitions and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  resolvers,
  typeDefs,
  // Always enable GraphQL playground and schema introspection, regardless of NODE_ENV value.
  introspection: true,
  playground: true
})

server.applyMiddleware({ app })

const port = process.env.PORT || 4001

app.listen({ port: port }, () =>
  console.log(
    `Apollo server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
