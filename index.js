import express from 'express';
import { client  } from './models/database';
const app = express()
require('./api/api.js')(app);
const port = 3000

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, ()=> console.log('App running on port 3000'));





