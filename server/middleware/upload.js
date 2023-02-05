/* eslint-disable max-len */
const ParseNotes = async (userId, listOfNotes) => {
    const stringOfNotes = listOfNotes.note;
    const notes = stringOfNotes.split('\n');
    const arrayOfNotes = [];

    let note = {
        'date': '',
        'text': '',
        'star': 'None',
        'userId': userId,
    };

    for (let i = 0; i <= notes.length + 1;) {
        // let date;
        let text = '';

        const noteDate = new Date(notes[i]);
        if (noteDate != 'Invalid Date') {
            // date = noteDate;
            note['date'] = noteDate.toISOString().split('T')[0];
            i++;
        }

        while (notes[i] != '\n' && (notes[i] != 'undefined' || notes[i] != undefined) && i < notes.length) {
            if (notes[i] === '\r' || notes[i].length === 0) {
                if (i +1 < notes.length &&(notes[i + 1] === '\r' || notes[i + 1].length === 0)) {
                    i++;
                    while (notes[i + 1] === '\r' || notes[i + 1].length === 0) {
                        i++;
                    }
                }
                if (text.length > 0) {
                    note['text'] = text.trim();
                    break;
                }
                i++;
            }
            text = text + '\n' + notes[i];
            i++;
        }

        if (text.length > 0) {
            note['text'] = text.trim();
        }

        arrayOfNotes.push(note);
        note = {
            'date': '',
            'text': '',
            'star': 'None',
            'userId': userId,
        };
        i++;
    }
    return (arrayOfNotes);
};

module.exports = ParseNotes;
