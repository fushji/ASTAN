const yargs = require('yargs');

const constant = require('./constant.js');
const noteUtils = require('./note.js');

const argv = yargs.command('add', 'Add new note', {
    title: constant.titleOptions,
    body: constant.bodyOptions
}).command('rm', 'Remove existing note', {
    title: constant.titleOptions
}).command('ls', 'List all notes')
    .command('get', 'Get a note', {
        title: constant.titleOptions
    }).help().argv;

var command = argv._[0];

if (command === 'add') {

    var note = noteUtils.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note created");
        notes.printNote(note);
    } else {
        console.log("Note not created");
    }

} else if (command === 'rm') {

    var isRemoved = noteUtils.rmNote(argv.title);
    console.log(isRemoved ? 'Note was removed' : 'Note not found');

} else if (command === 'ls') {

    var notes = noteUtils.listNotes();

    if (notes.length != 0) {
        console.log(`Found ${notes.length} notes`);
        notes.forEach((note) => noteUtils.printNote(note));
    } else {
        console.log(`No notes found`);
    }

} else if (command === 'get') {

    var note = noteUtils.getNote(argv.title);
    noteUtils.printNote(note);

} else {
    console.log('Console not found');
}