

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('website'));

const projectData = {};

app.get('/get_data', (req, res) => {
  res.json(projectData);
});

app.post('/add_data', (req, res) => {
  const newData = req.body;
  projectData.date = newData.date;
  projectData.temp = newData.temp;
  projectData.content = newData.content;
  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
