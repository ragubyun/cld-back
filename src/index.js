const express = require('express');
const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const routes = require('./routes/index');

const adapter = new FileSync('db/db.json');
const db = lowdb(adapter);

db.defaults({ tokens: [] })
  .write();

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((request, response, next) => {
  console.log(`${request.method} ${request.url}`);
  console.log(request.body);
  next();
});
app.use(cors());

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
