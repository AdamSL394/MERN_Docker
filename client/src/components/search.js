import React,{useState} from "react"
import Notes from '../router/noteRoutes.js'
import { useAuth0 } from '@auth0/auth0-react'


function Search(props) {

    const [searchTeam, setSearchTerm] = useState("")
    const { user } = useAuth0();

    const searchDataBase = async (e) => {
        const userId = user.sub.split("|")[1];
        let searchValue = e.target.value
        if (searchValue === "#" || searchValue === "%" || searchValue === "\\"){
            return
        }
        e.preventDefault()
        setSearchTerm(searchValue)
        const searchedNotes = await Notes.searchNote(searchValue,userId);
        props.parentCallback(searchedNotes,searchValue)
     }


    return (
        <> 
                <input
                    autoFocus={true}
                    autoComplete="new-password"
                    style={{ alignText: "center",width: "13rem",
                    height: "1.3rem"}}
                    type="text"
                    placeholder="Search…"
                    inputprops={{ 'aria-label': 'search' }}
                    onChange={(e) => searchDataBase(e)}
                >
                </input>
        </>
    )

}

export default Search