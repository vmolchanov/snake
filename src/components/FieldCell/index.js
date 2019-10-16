import React from 'react';
import Point from '../../utils/point/point';
import Size from '../../utils/size/size';
import PropTypes from 'prop-types';

function FieldCell(props) {
    const {
        style,
        coord,
        size
    } = props;

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

FieldCell.propTypes = {
    style: PropTypes.object,
    coord: PropTypes.instanceOf(Point),
    size: PropTypes.instanceOf(Size)
};

export default FieldCell;