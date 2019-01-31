const express = require('express');

const dbAccessor = require('../db/db-accessor');

const router = express.Router();

router.get('/', (request, response) => {
  response.send(dbAccessor.get(['tokens']));
});

// router.get('/:token', (request, response) => {
//   const { token } = request.params;
//   const data = db.get('tokens')
//     .find({ token })
//     .value();
//   response.send(data);
// });

router.post('/', (request, response) => {
  const { userAgent, token } = request.body;
  const found = dbAccessor.get(['tokens']).find(t => t.token === token);

  if (!found) {
    dbAccessor.push(['tokens'], { userAgent, token });
  }

  response.sendStatus(200);
});

module.exports = router;
