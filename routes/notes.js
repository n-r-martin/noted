const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../utils/fsUtils');
const { v4: uuidv4 } = require('uuid');

///// API ROUTES /////

// GET Route for retrieving the Notes data
// Current Route /api/notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// // POST Route for a new Note
// Current Route /api/notes
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

// Current Route /api/notes
notes.delete('/:id', (req, res) => {
  console.log('deleting...');

  const { id } = req.params;
 
  console.log(id);

  readFromFile('./db/notes.json').then((data) => {
    parsedData = JSON.parse(data);
    console.log(parsedData);

    updatedNotes = parsedData.filter(note => note.id !== id);

    console.log(updatedNotes);
  })
  .then(() => writeToFile('./db/notes.json', updatedNotes))
  .then(() => readFromFile('./db/notes.json')
  .then((data) => res.json(JSON.parse(data))));
})



module.exports = notes;
