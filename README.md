https://thegymwanderer.xyz/

# gym-wanderer
Rent out your personal home gym, to make a profit $$$. Or you can reserve times at other users personal gyms as an alternative to
paying for an expensive gym membership

# Stack
React<br/>
Node<br/>
Express<br/>
GraphQL<br/>
PostGresql<br/>

# tooling
Type ORM <br/>
Type Graphql<br/>
Graphql Code Generator<br/>

# Directories 
`/app` React Native<br/>
`/controllers` shared code (graphql queries/mutations) between React web and React Native<br/>
`/web` React web client<br/>
`/server` TypeORM GraphQL server with postgreSQL database<br/>

# How to run

# 1) Make sure you have an instance of postgres running on your machine


# 2) Clone and install dependencies
`git clone https://github.com/tomcorey26/gym-wanderer.git`<br/>
`cd gym-wanderer && yarn`<br/>

Specify the connection infomation to your db inside the createConnection()
function in server/index.ts

# 3) Run these in two  different terminal instances

`cd packages/server && npm start `<br/>
`cd packages/web && npm start `<br/>
