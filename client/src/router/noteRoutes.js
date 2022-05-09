export default {
    deleteNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`http://localhost:5000/users/delete/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    },

    getAllNotes: (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`http://localhost:5000/users/all/${userId}`, requestOptions)
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

        return fetch(`http://localhost:5000/users/update/${note._id}`, requestOptions)
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
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`http://localhost:5000/users/all/order/${userId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return  JSON.parse(results)
            })
            .catch(error => console.log('error', error));
    },
    
    getNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`http://localhost:5000/users/note/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return(results)
            })
            .catch(error => console.log('error', error));
    }
}