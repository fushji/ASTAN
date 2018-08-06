const fs = require('fs');

var readNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('./notes-file.json'));
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('./notes-file.json', JSON.stringify(notes));
};

var printNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

var addNote = (title, body) => {
    var notes = readNotes();

    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var listNotes = () => {
    return readNotes();
}

var rmNote = (title) => {
    var notes = readNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);

    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

var getNote = (title) => {
    var notes = readNotes();
    var filteredNotes = notes.filter((note) => note.title === title);

    return filteredNotes[0];
}

module.exports = {
    addNote,
    listNotes,
    printNote,
    rmNote,
    getNote
}