const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db/db.json');
const db = lowdb(adapter);

const router = express.Router();

router.get('/', (request, response) => {
  const data = db.get('tokens')
    .value();
  response.send(data);
});

router.get('/:token', (request, response) => {
  const { token } = request.params;
  const data = db.get('tokens')
    .find({ token })
    .value();
  response.send(data);
});

router.post('/', (request, response) => {
  const { userAgent, token } = request.body;
  const notFound = !db.get('tokens')
    .find({ token })
    .value();

  if (notFound) {
    db.get('tokens')
      .push({
        userAgent,
        token
      })
      .write();
  }

  response.sendStatus(200);
});

module.exports = router;
