import React from 'react';
import FieldCell from '../FieldCell';
import Point from '../../utils/point';
import Size from '../../utils/size';
import PropTypes from 'prop-types';

function FieldRow(props) {
    const CELL_SIZE = 10;
    const EMPTY_CELL_STYLE = {
        fill: 'rgba(255, 255, 255, 0.15)'
    };
    const FILL_CELL_STYLE = {
        fill: '#000000'
    };
    
    const {row, rowIndex} = props;

    return (
        <g className='FieldRow'>
            {
                row.map((cell, cellIndex) => {
                    return (
                        <FieldCell
                            key={cellIndex}
                            style={cell === 0 ? EMPTY_CELL_STYLE : FILL_CELL_STYLE}
                            coord={new Point(
                                cellIndex * CELL_SIZE + cellIndex * 3 + 14,
                                rowIndex * CELL_SIZE + rowIndex * 3 + 14
                            )}
                            size={new Size(
                                CELL_SIZE,
                                CELL_SIZE
                            )}
                        />
                    )
                })
            }
        </g>
    );
}

FieldRow.propTypes = {
    row: PropTypes.array,
    rowIndex: PropTypes.number
};

export default FieldRow;