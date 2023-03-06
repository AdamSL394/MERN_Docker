/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid/index.js';
import Card from '@mui/material/Card/index.js';
import Button from '@mui/material/Button/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import Select from '@mui/material/Select/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Textarea from '../TextArea/index.js';
import { TrackedEmojis } from '../TrackedEmojis/index.js';
import { EditingTrackedEmojis } from '../EditingTrackedEmojis/index.js';

function EditingNote(props) {
    return (
        <Grid xs={8} sm={5} md={5} lg={2} style={{ margin: '.5%' }} item>
            <Card variant="outlined" id="Card">
                <Button
                    onClick={() => props.openModal(props.note)}
                    color="primary"
                    id="deleteButton"
                >
                    <strong>X</strong>
                </Button>

                <div
                    style={{
                        marginLeft: '5%',
                    }}
                    id="dateInput"
                >
                    <input
                        onChange={(e) => {
                            props.onChangeTextArea(e, props.note);
                        }}
                        type="date"
                        defaultValue={props.note.date}
                        style={{
                            marginTop: '4%',
                            borderRadius: '5px 5px 5px 5px',
                            border: '1px solid #cbcbcb',
                        }}
                    ></input>

                    <FormControl
                        sx={{ m: 1, minWidth: 90 }}
                        size="medium"
                        style={{ alignSelf: 'center' }}
                    >
                        <InputLabel
                            id="demo-select-small"
                            style={{ alignSelf: 'center' }}
                        ></InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            onChange={(e) => props.onStarValueChange(e, props.note)}
                            defaultValue={props.note.star}
                            style={{ height: ' 1.3rem' }}
                        >
                            <MenuItem value={'None'}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'1'}>
                                <span role="img" aria-label="Star">
                  🌟
                                </span>
                            </MenuItem>
                            <MenuItem value={'2'}>
                                <span role="img" aria-label="Star">
                  🌟🌟
                                </span>
                            </MenuItem>
                            <MenuItem value={'3'}>
                                <span role="img" aria-label="Star">
                  🌟🌟🌟{' '}
                                </span>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <EditingTrackedEmojis
                    note={props.note}
                    setNoteValue={props.setNoteValue}
                >
                </EditingTrackedEmojis>
                <Textarea
                    notes={props.notes}
                    note={props.note}
                    setNoteValue={props.setNoteValue}
                ></Textarea>
                <div>
                    <Button onClick={() => props.saveNote(props.note, props.currentPage)}>
                        <strong>Save Me</strong>
                    </Button>
                </div>
                <>{props.note.textLength}</>
                <TrackedEmojis
                    note={props.note}
                >
                </TrackedEmojis>
            </Card>
        </Grid>
    );
}

export default EditingNote;


EditingNote.propTypes = {
    setNoteValue: PropTypes.func,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    note: PropTypes.array,
    notes: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        user: PropTypes.number,
    }),
    ),
    onStarValueChange: PropTypes.func,
    currentPage: PropTypes.number,
    saveNote: PropTypes.func,
};
