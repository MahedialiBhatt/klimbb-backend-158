Steps to start app (On starting of application it will load data) ->

1. npm install
2. add SERVER_PORT and MONGO_URI in .env as mentioned in .env.example
3. npm run start or npm run start:dev

Tech Stack:
- Nodejs
- Expressjs
- MongoDB
- Typescript

List of endpoints:
- GET /api/balance/:address
- GET /api/transaction/:address
- POST /api/transaction
