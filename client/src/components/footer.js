import React from "react";


function Footer() {

    const mystyle = {
        position: "absolute",
        bottom: 0,
        width: "100vw",
        borderTop: "solid .5px",
        textAlign:"center",
        margin:0,
        fontSize:"small"
    };

    return (
        <div style={mystyle}>
            © AdamSL394 GH
        </div>
    )
}

export default Footer