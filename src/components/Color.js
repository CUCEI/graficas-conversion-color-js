import React from 'react';

function Color(props) {
    let style = {
        width: '100%',
        height: '100px',
        backgroundColor: `rgb(${Math.trunc(props.components.component1)},${Math.trunc(props.components.component2)},${Math.trunc(props.components.component3)})`,
    }

    return (
        <div style={style}></div>
    )
}

export default Color;
