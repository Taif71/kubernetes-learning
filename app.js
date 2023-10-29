const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const filePath = path.join(__dirname, 'story', 'text.txt');
const filePath = path.join(__dirname, process.env.STORY_FOLDER, 'text.txt'); // since we are using env variables in k8s deployment.yaml file. we did this

app.use(bodyParser.json());

app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' });
    }
    res.status(200).json({ story: data.toString() });
  });
});

app.post('/story', (req, res) => {
  const newText = req.body.text;
  if (newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' });
  }
  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });
});

app.get('/error', () => {
  process.exit(1); // this will crash the container and cause it to restart
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
