import enviromentAPI from '../config/config.js'


export default {
    deleteNote: async (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${enviromentAPI.api_url}/notes/delete/${noteId}`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    },

    getAllNotes: async (userid) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${enviromentAPI.api_url}/notes/all?id=${userid}`, requestOptions);
            const results = await response.text();
            return JSON.parse(results);
        } catch (error) {
            return console.log('error', error);
        }
    },

    updateNote: async (note) => {

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

        try {
            const response = await fetch(`${enviromentAPI.api_url}/notes/update/${note._id}`, requestOptions);
            const result_1 = await response.text();
            return result_1;
        } catch (error) {
            //setErrorFlag("visible")
            console.log('error', error);
        }
    },

    searchNote: async (searchValue, userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${enviromentAPI.api_url}/notes/search/${searchValue}/${userId}`, requestOptions);
            const results = await response.text();
            let cast = JSON.parse(results);
            return cast;
        } catch (error) {
            return console.log('error', error);
        }
    },

    getNotesOrdered: async (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`${enviromentAPI.api_url}/notes/all/order/${userId}`, requestOptions)
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

    getNote: async (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        return fetch(`${enviromentAPI.api_url}/notes/note/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(results => {
                return (results)
            })
            .catch(error => console.log('error', error));
    },

    getNoteRange: async (userId, todaysDate, lastWeeksDate) => {
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

        return fetch(`${enviromentAPI.api_url}/notes/noterange`, requestOptions)
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

    uploadNotes: async (value, userId) => {
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
        return fetch(`${enviromentAPI.api_url}/notes/upload`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result

            })
            .catch(error => {
                console.log(error)
            });
    },

    getNoteRangeYear: async (userid, tdYearAgo, lwYearAgo) => {
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
        return fetch(`${enviromentAPI.api_url}/notes/lastyear/${userid}/${tdYearAgo}/${lwYearAgo}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => {
                console.log(error)
            });
    },

    Leetcode_stats: async () => {
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
        return fetch(`https://leetcode-stats-api.herokuapp.com/adamsl394`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return JSON.parse(result)
            })
            .catch(error => {
                console.log(error)
            });
    },

    getUserInfomation: async (user) => {
        const userid = user.sub.split("|")[1]
        let myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "user": user,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        return fetch(`${enviromentAPI.api_url}/api/users/user/${userid}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return (result)
            })
            .catch(error => console.log('error', error));
    },

    postNote: async (raw) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json")
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: JSON.stringify(raw)
        };
        return fetch(`${enviromentAPI.api_url}/notes/note`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => {
            });
    },

    postUserStats: async (user, trackedStat) => {
        const userid = user.sub.split("|")[1]
        let myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "user": user,
            "trackedStats": trackedStat
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        return fetch(`${enviromentAPI.api_url}/api/users/user/trackedstats/${userid}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    },

    getNoteYears: async (id) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`${enviromentAPI.api_url}/notes/aggregateNoteyears`, requestOptions)
            .then(response => response.text())
            .then(result => {return (result)})
            .catch(error => console.log('error', error));
    }
}