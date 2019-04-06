import React from 'react';

function FieldCell(props) {
    const {style, coord, size} = props;

    return (
        <rect
            style={style}
            x={coord.x}
            y={coord.y}
            width={size.width}
            height={size.height}
        />
    );
}

export default FieldCell;