import {useState} from 'react';

export const useFirstView = () => {
  const [isFirstView, setIsFirstView] = useState(true);
  const setViewed = () => setIsFirstView(false);
  return [isFirstView, {setViewed}];
};
