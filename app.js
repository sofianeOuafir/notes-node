"use strict";
console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv; 
var command = argv._[0];
console.log('Yargs', argv);

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log(`Note Created`);
    notes.logNote(note);
  } else{
    console.log("Note title taken");
  }
} else if(command === 'list'){
  console.log(notes.getAll()); 
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