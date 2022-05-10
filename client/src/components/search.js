import React,{useState} from "react"
import { styled, alpha } from '@mui/material/styles/index.js';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

function Search() {

    // const [searchedNotes, setSearchedNotes] = useState([])
    // const [searchTerms, setSearchTerms] = useState("")

    const searchDataBase = (e) => {
        // let filteredNotes = []
        // notes.filter((notes) => {
        //     if (notes.text.indexOf(e.target.value) !== -1) {
        //         filteredNotes.push(notes)
        //     }

        // })
        // console.log(filteredNotes)
        // setNotes(filteredNotes)
    }

    // const searchDataBase = (e) => {

    //     // console.log()
    //     setSearchTerms(e.target.value)
    //     e.preventDefault()
    //     var myHeaders = new Headers();
    //     myHeaders.append("X-Requested-With", "XMLHttpRequest");
    //     myHeaders.append("origin", "http://localhost:3000/");

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(`http://localhost:5000/users/search/${searchTerms}`, requestOptions)
    //         .then(response => response.text())
    //         .then(results => {
    //             let cast = JSON.parse(results)
    //             setSearchedNotes(cast)
    //             setNotes([])

    //         })
    //         .catch(error => console.log('error', error));
    //  }


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '50%',
        },
        border: "solid .5px",
        borderColor: "lightgray",
        alignItems: 'center',
        textAlign: "center",
        marginTop: "1%",
        marginBottom: "1%",
        width: "50%",
        // align-items: "center";
        // text-align: "center";
        left: "25%",
    }));

    // const SearchIconWrapper = styled('div')(({ theme }) => ({
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }));

    // const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //     color: 'inherit',
    //     '& .MuiInputBase-input': {
    //         padding: theme.spacing(1, 1, 1, 0),
    //         // vertical padding + font size from searchIcon
    //         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //         transition: theme.transitions.create('width'),
    //         width: '100%',
    //         [theme.breakpoints.up('sm')]: {
    //             width: '55ch',
    //             '&:focus': {
    //                 width: '20ch',
    //             },
    //         },
    //     },
    // }));


    return (
        <>
         {/* <Search

                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase */}
                <input
                    style={{ alignText: "center" }}
                    type="text"
                    placeholder="Search…"
                    inputprops={{ 'aria-label': 'search' }}
                    onChange={(e) => searchDataBase(e)}
                >
                    {/* {searchTerms}
                    </StyledInputBase>
                </Search> */}
                </input>
                {/* {searchedNotes.map((notes, i) => {
                        return (
                            <>
                                <Grid key={i + 100} item xs={12} sm={6} md={4} lg={3}>
                                    <Card
                                        key={i + 110}
                                        id="Card"
                                        value={notes.id}
                                        variant="outlined"
                                    >
                                        <h3>
                                            {notes.text}
                                        </h3>
                                        <div
                                            key={i + 104}
                                        >
                                            {notes.date}
                                        </div>
                                        <div
                                            key={i + 105}
                                        >
                                            {notes.star}
                                        </div>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })} */}
        </>
    )

}

export default Search