/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@mui/material/Grid/index.js';
import Card from '@mui/material/Card/index.js';
import Button from '@mui/material/Button/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import Select from '@mui/material/Select/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';

function EditingNote(props) {
  const readOnly = false;

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
        <div style={{ borderTop: '1px solid #cbcbcb' }}>
          <span
            role="img"
            aria-label="eyes"
            style={{
              marginRight: '.4rem',
              border: '2px lightgrey',
              borderRadius: '10px 10px 10px 10px',
              cursor: 'pointer',
              paddingLeft: '4px',
            }}
            onClick={() => props.noteLook(props.note)}
          >
            {' '}
            👀{' '}
          </span>

          <span
            role="img"
            aria-label="arm"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteGym(props.note)}
          >
            💪🏼{' '}
          </span>

          <span
            role="img"
            aria-label="leaf"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteWeed(props.note)}
          >
            🍁{' '}
          </span>

          <span
            role="img"
            aria-label="computer guy"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteCode(props.note)}
          >
            👨🏻‍💻{' '}
          </span>

          <span
            role="img"
            aria-label="books"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteRead(props.note)}
          >
            📚{' '}
          </span>

          <span
            role="img"
            aria-label="pizza"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteEatOut(props.note)}
          >
            🍕{' '}
          </span>

          <span
            role="img"
            aria-label="basketball"
            style={{ marginRight: '.4rem', cursor: 'pointer' }}
            onClick={() => props.noteBasketball(props.note)}
          >
            ⛹🏻‍♂️{' '}
          </span>
        </div>
        <textarea
          style={{
            width: '94%',
            fontSize: 'medium',
            borderRadius: '5px 5px 5px 5px',
            height: '13rem',
          }}
          id="editCard"
          autoFocus={true}
          readOnly={readOnly}
          onChange={(e) => props.onChangeTextArea(e, props.note)}
          onKeyDown={(e) => props.checkfordelete(e, props.note)}
          onPaste={(e) => props.onChangeTextArea(e, props.note)}
        >
          {props.note.text}
        </textarea>

        <div>
          <Button onClick={() => props.saveNote(props.note, props.currentPage)}>
            <strong>Save Me</strong>
          </Button>
        </div>
        <>{props.note.textLength}</>
        <div>
          <span>
            {props.note.look ? (
              <span
                role="img"
                aria-label="eyes"
                style={{
                  backgroundColor: 'lightgrey',
                  marginRight: '.4rem',
                  border: '2px lightgrey',
                  borderRadius: '10px 10px 10px 10px',
                  paddingLeft: '4px',
                }}
              >
                {' '}
                👀{' '}
              </span>
            ) : null}
          </span>

          <span>
            {props.note.gym ? (
              <span role="img" aria-label="arm" className="emoji">
                💪🏼{' '}
              </span>
            ) : null}{' '}
          </span>

          <span>
            {props.note.weed ? (
              <span role="img" aria-label="leaf" className="emoji">
                🍁{' '}
              </span>
            ) : null}{' '}
          </span>

          <span>
            {props.note.code ? (
              <span role="img" aria-label="computer guy" className="emoji">
                👨🏻‍💻{' '}
              </span>
            ) : null}{' '}
          </span>

          <span>
            {props.note.read ? (
              <span role="img" aria-label="books" className="emoji">
                📚{' '}
              </span>
            ) : null}{' '}
          </span>

          <span>
            {props.note.eatOut ? (
              <span role="img" aria-label="pizza" className="emoji">
                🍕{' '}
              </span>
            ) : null}{' '}
          </span>

          <span>
            {props.note.basketball ? (
              <span role="img" aria-label="basketball" className="emoji">
                ⛹🏻‍♂️{' '}
              </span>
            ) : null}{' '}
          </span>
        </div>
      </Card>
    </Grid>
  );
}

export default EditingNote;
