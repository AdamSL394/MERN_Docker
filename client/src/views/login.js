import React, { useEffect, useState } from "react";
import styles from "./login.css"
import LoginButton from '../components/loginButton';

function Login() {

  const [text, setText] = useState()

  var words = ['Note Script'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 100;

  var wordflick = function () {
    let count = 0
    let a = setInterval(function () {

      if (forwards) {

        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      }
      else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        }
        else {
          offset--;
        }
      }
      setText(part);
      count++
      //37 script disappears
      //25 keeps text on screen
      if (count === 25) {
        clearInterval(a)
      }
    }, speed);

  };

  useEffect((a) => {
    wordflick()
  }, [])


  return (
    <div>
      <div className="word container">{text}</div>
      {/* <LoginButton></LoginButton> */}
    </div>
  )

}



export default Login