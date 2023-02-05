import React from 'react';


function Footer() {
    const mystyle = {
        bottom: 0,
        width: '100vw',
        borderTop: 'solid 1.5px',
        textAlign: 'center',
        margin: 0,
        fontSize: 'small',
        backgroundColor: '#e9d8c2',
        position: 'fixed',
    };

    const outline = {
        // borderTop: "solid .6rem",
        // borderColor:"#e9d8c2",
        // position:"fixed",
        // width: "100vw",
        backgroundColor: '#e9d8c2',
        color: '#f4f4f4',
    };

    return (
        <span style={mystyle}>
            <div style={outline}>
            © AdamSL394 GH
            </div>
        </span>
    );
}

export default Footer;
