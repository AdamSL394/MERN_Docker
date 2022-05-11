const config = require('../config.json')
const enviroment = process.env.REACT_APP_NODE_ENV || 'development'
export const enviromentAPI = config[enviroment]


export default {
    deleteNote: (noteId) => {
        // var myHeaders = new Headers();
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("origin", enviromentAPI.api_url);

        // var requestOptions = {
        //     method: 'DELETE',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };

        // return fetch(`${enviromentAPI.api_url}/users/delete/${noteId}`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         return result
        //     })
        //     .catch(error => console.log('error', error));
    },

    getAllNotes: (userId) => {
        // var myHeaders = new Headers();
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("origin",enviromentAPI.api_url);
        // myHeaders.append("Content-Type", "application/json");


        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow',
        // };

        // return fetch(`${enviromentAPI.api_url}/users/all/${userId}`, requestOptions)
        //     .then(response => response.text())
        //     .then(results => {
        //         return  JSON.parse(results)
        //     })
        //     .catch(error => console.log('error', error));
    },

    updateNote: (note) => {
        // var myHeaders = new Headers();
        // myHeaders.append("origin", enviromentAPI.api_url);
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("Content-Type", "application/json");
        // var raw = JSON.stringify({
        //     "text": note.text,
        //     "date": note.date,
        //     "star": note.star,
        //     "edit": note.edit
        // });

        // var requestOptions = {
        //     method: 'PATCH',
        //     headers: myHeaders,
        //     redirect: 'follow',
        //     requireHeader: ['origin', 'x-requested-with'],
        //     body: raw
        // };

        // return fetch(`${enviromentAPI.api_url}/users/update/${note._id}`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         return result
        //     })
        //     .catch(error => {
        //         //setErrorFlag("visible")
        //         console.log('error', error)

        //     });
    },

    saveNote:(userId) => {

    },

    getNotesOrdered: (userId) => {
        // var myHeaders = new Headers();
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("origin", enviromentAPI.api_url);
        // myHeaders.append("Content-Type", "application/json");


        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow',
        // };

        // return fetch(`${enviromentAPI.api_url}/users/all/order/${userId}`, requestOptions)
        //     .then(response => response.text())
        //     .then(results => {
        //         console.log(results)
        //         return  JSON.parse(results)
        //     })
        //     .catch(error => console.log('error', error));
    },
    
    getNote: (noteId) => {
        // var myHeaders = new Headers();
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("origin", enviromentAPI.api_url);
        // myHeaders.append("Content-Type", "application/json");


        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow',
        // };

        // return fetch(`${enviromentAPI.api_url}/users/note/${noteId}`, requestOptions)
        //     .then(response => response.text())
        //     .then(results => {
        //         return(results)
        //     })
        //     .catch(error => console.log('error', error));
    },

    getNoteRange: (userId,todaysDate,lastWeeksDate) => {
        // var myHeaders = new Headers();
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("origin", enviromentAPI.api_url);
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "userId": userId,
        //     "start": todaysDate,
        //     "end": lastWeeksDate
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch(`${enviromentAPI.api_url}/users/noterange`, requestOptions)
        //     .then(response => response.text())
        //     .then(results => {
        //         if(results.length > 0){
        //             console.log(results)
        //             return(results)
        //         }
        //         else{


        //         }
        //     })
        //     .catch(error => console.log('error', error));

    }
}