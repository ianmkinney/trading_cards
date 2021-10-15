const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { PokemonCards } = require('./models/index')

//start the server
seed()

//*************** ROUTES ******************//