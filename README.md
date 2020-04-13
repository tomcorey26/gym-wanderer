# gym-wanderer
Rent out your personal home gym, or find some of your own

# Stack
React
Node
Express
Type ORM / Type Graphql
GraphQL
PostGresql

# Directories 
`/app` React Native
`/controllers` shared code (graphql queries/mutations) between React web and React Native
`/web` React web client
`/server` TypeORM GraphQL server with postgreSQL database

# How to run

# 1) Make sure you have an instance of postgres running on your machine

# 2)
`git clone https://github.com/tomcorey26/gym-wanderer.git`
`cd gym-wanderer && yarn`

# 3) Run these in two different terminal instances

`cd packages/server && npm start `
`cd packages/web && npm start `
