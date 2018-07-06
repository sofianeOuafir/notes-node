"use strict";
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .help()
  .argv; 
var command = argv._[0];

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log(`Note Created`);
    notes.logNote(note);
  } else{
    console.log("Note title taken");
  }
} else if(command === 'list'){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read'){
  var note = notes.getNote(argv.title);
  if(note){
    console.log(`Note found!`);
    notes.logNote(note);
  } else{
    console.log('Note not found');
  }
} else if(command === 'remove'){
  var removed = notes.removeNote(argv.title);
  var message = removed ? 'Note has been removed' : 'Failed removing Note'
  console.log(message);
} else{
  console.log('Command not recognized');
}