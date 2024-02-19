import express from 'express';
import mongoose from 'mongoose';

import * as routes from './routes/index';
import * as africaController from './controllers/africa.controller';

const app = express()
const port = 3001

app.use(express.json())

app.use('/', routes.default)


mongoose.connect('mongodb+srv://yanismohamed:pW2dlST1dR2waNNY@cluster0.omn1yha.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('mongodb est connecté')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
    .catch(() => {
    console.log('mongo est pas co !')
  })