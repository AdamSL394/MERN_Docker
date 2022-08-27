import enviromentAPI from '../config/config.js'


export default {
    deleteNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${enviromentAPI.api_url}/users/delete/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    },

    getAllNotes: (userid) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`${enviromentAPI.api_url}/users/all?id=${userid}`, requestOptions)
            .then(response => response.text())
            .then(results => {

                return JSON.parse(results)
            })
            .catch(error => console.log('error', error));
    },

    updateNote: (note) => {

        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": note.text,
            "date": note.date,
            "star": note.star,
            "edit": note.edit,
            "look": note.look || false,
            "gym": note.gym || false,
            "weed": note.weed || false,
            "code": note.code || false,
            "read": note.read || false,
            "eatOut": note.eatOut || false,
            "basketball": note.basketball || false
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        return fetch(`${enviromentAPI.api_url}/users/update/${note._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => {
                //setErrorFlag("visible")
                console.log('error', error)

            });
    },

    searchNote: (searchValue, userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${enviromentAPI.api_url}/users/search/${searchValue}/${userId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                let cast = JSON.parse(results)
                return cast
            })
            .catch(error => console.log('error', error));
    },

    getNotesOrdered: (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`${enviromentAPI.api_url}/users/all/order/${userId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                const orderedNotes = JSON.parse(results)
                if (orderedNotes < 1) {
                    return []
                } else {
                    return orderedNotes
                }
            })
            .catch(error => console.log('error', error));
    },

    getNote: (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`${enviromentAPI.api_url}/users/note/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return (results)
            })
            .catch(error => console.log('error', error));
    },

    getNoteRange: (userId, todaysDate, lastWeeksDate) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": userId,
            "start": todaysDate,
            "end": lastWeeksDate
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`${enviromentAPI.api_url}/users/noterange`, requestOptions)
            .then(response => response.text())
            .then(results => {

                if (results.length > 0) {
                    let dbresults = results
                    return (dbresults)
                }
                else {


                }
            })
            .catch(error => console.log('error', error));

    },

    uploadNotes: (value,userId) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userId": userId,
            "note": value
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };
        return fetch(`${enviromentAPI.api_url}/users/upload`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result

            })
            .catch(error => {
                console.log(error)
            });
    },

    getNoteRangeYear :(userid, tdYearAgo, lwYearAgo) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
       
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
        };
        return fetch(`${enviromentAPI.api_url}/users/lastyear/${userid}/${tdYearAgo}/${lwYearAgo}`, requestOptions)
            .then(response => response.text())
            .then(result => {
             return result
            })
            .catch(error => {
                console.log(error)
            });
    }
}