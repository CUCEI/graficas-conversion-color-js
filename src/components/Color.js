import React from 'react';

function Color(props) {
    let style = {
        width: '100%',
        height: '100px',
        backgroundColor: `rgb(${props.rgb.r},${props.rgb.g},${props.rgb.b})`,
    }

    return (
        <div style={style}></div>
    )
}

export default Color;
