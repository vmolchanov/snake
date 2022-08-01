import React from 'react';
import {connect} from 'react-redux';

import {ModeViewTemplate} from './mode-view';
import {EMode} from '@utils/enums';
import {setMode} from '@actions';

const modes = [
  {
    type: EMode.EASY,
    text: 'Легко'
  },
  {
    type: EMode.HARD,
    text: 'Сложно'
  }
];

const onLinkClick = (onModeChoose) => (e) => {
  onModeChoose(e.target.dataset.mode)
};

const ModeView = (props) => {
  const {onModeChoose} = props;
  return (
    <ModeViewTemplate
      modes={modes}
      onLinkClick={onLinkClick(onModeChoose)}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  onModeChoose: (mode) => {
    dispatch(setMode(mode));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(ModeView);
