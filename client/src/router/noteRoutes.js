export default {
    deleteNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "https://note-script-dev.herokuapp.com/");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`https://note-script-dev.herokuapp.com/users/delete/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    },

    getAllNotes: (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "https://note-script-dev.herokuapp.com/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`https://note-script-dev.herokuapp.com/users/all/${userId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return  JSON.parse(results)
            })
            .catch(error => console.log('error', error));
    },

    updateNote: (note) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", "");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": note.text,
            "date": note.date,
            "star": note.star,
            "edit": note.edit
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        return fetch(`https://note-script-dev.herokuapp.com/users/update/${note._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => {
                //setErrorFlag("visible")
                console.log('error', error)

            });
    },

    saveNote:(userId) => {

    },

    getNotesOrdered: (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "https://note-script-dev.herokuapp.com/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`https://note-script-dev.herokuapp.com/${userId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return  JSON.parse(results)
            })
            .catch(error => console.log('error', error));
    },
    
    getNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "https://note-script-dev.herokuapp.com/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`https://note-script-dev.herokuapp.com/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return(results)
            })
            .catch(error => console.log('error', error));
    }
}