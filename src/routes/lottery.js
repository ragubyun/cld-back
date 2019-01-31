const express = require('express');
const _ = require('underscore');
const axios = require('axios');

const dbAccessor = require('../db/db-accessor');

const router = express.Router();

router.get('/', (request, response) => {
  const users = dbAccessor.get(['tokens']);

  const winners = _.sample(users, 3);

  users.forEach(async user => {
    await axios
      .post('https://fcm.googleapis.com/fcm/send', {
        notification: {
          title: 'CLD free coffee event',
          body: '커피 추첨 결과 확인하러 가즈아~!',
          icon: '/img/act-logo.png',
          click_action: 'https://cld.ragubyun.com'
        },
        data: {
          winResult: winners.find(winner => winner.token === user.token) ? 'win' : 'lose',
        },
        to: user.token,
      }, {
        headers: {
          'Authorization': 'key=AAAAAl_VyiA:APA91bFEf1HIJeSW7aoNNnmTcl3eNrFd1DfL_M60nvgYbaHwQwg7Fb1sydn4NisVIrVToKFzg_LvNg0uffBA3Yx70ShwpbDr-lmMO3O4hZlHO2VyLgXtFw3gPqP5pxpYc16Cy8VlijqM',
          'Content-Type': 'application/json',
        },
      });
  });

  response.send(winners.map(winner => winner.userAgent));
});

module.exports = router;
