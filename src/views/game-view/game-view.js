import React from 'react';

import './style.css';
import FieldRow from '@components/FieldRow';

export const GameViewTemplate = props => {
  const {
    containerRef,
    controlClassNames,
    controlImages,
    field,
    handleOverlayClick,
    overlayRef,
    svgRef
  } = props;

  return (
    <div className='Game' ref={containerRef}>
      <div
        className='Game__overlay'
        onClick={handleOverlayClick}
        ref={overlayRef}
      >
        <p className='Game__overlay-text'>Нажмите для начала игры</p>
        <ul className={controlClassNames}>
          {controlImages.map(({src, alt}, index) => (
            <li className="Game__control-item" key={index}>
              <img
                src={src}
                className="Game__control-image"
                alt={alt}
              />
            </li>
          ))}
        </ul>
      </div>
      <svg
        className='Game__svg'
        width='400'
        height='400'
        viewBox='0 0 155 155'
        xmlns='http://www.w3.org/2000/svg'
        ref={svgRef}
      >
        {field.map((row, index) => (
          <FieldRow
            row={row}
            rowIndex={index}
            key={index}
          />
        ))}
      </svg>
    </div>
  );
};
