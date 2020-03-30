import express from 'express';
import { client  } from './models/database';
const app = express()
require('./api/CaseApi.js')(app);
require('./api/OwnerApi.js')(app);
require('./api/PoliceApi.js')(app);
const port = 3000

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, ()=> console.log('App running on port 3000'));





