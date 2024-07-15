const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

const client = new line.Client({
  channelAccessToken: config.channelAccessToken,
});

app.post('/webhook', (req, res) => {
  const events = req.body.events;
  console.log('Received events:', JSON.stringify(events, null, 2)); // Log the received events

  Promise.all(events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error('Error handling event:', err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const replyText = `You said: ${event.message.text}, Boss said I love you`;

  const message = {
    type: 'text',
    text: replyText,
  };

  try {
    const response = await client.replyMessage(event.replyToken, message);
    console.log('Reply response:', response); // Log the response from LINE API
    return response;
  } catch (err) {
    console.error('Error replying to message:', err); // Log the error
    throw err;
  }
}

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
