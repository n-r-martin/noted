const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Question for TA or Tutor - why do I need to use /api for getting the data -- and why does it not like it 
// when I try to serve my HTML page from the same place the data is being called. Does it have something to do
// with the following line of code? Just kind of want to get an idea of best practices in organizing what routes where
// Is it confusing to the sevrer if I have /notes serving both data and a static page
// The front-end fetch has api in the path and just kind of need  a refresher on how that's talking to each other
// Cant Insomia hit the endpoint where the data is on it's own?
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for 404 
app.get('/*', (req, res) => 
  res.status(404).sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
