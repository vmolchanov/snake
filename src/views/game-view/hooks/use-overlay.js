export const useOverlay = (overlayRef) => {
  const showOverlay = () => {
    overlayRef.current.classList.remove('Game__overlay_hidden');
  };
  const hideOverlay = () => {
    overlayRef.current.classList.add('Game__overlay_hidden');
  };
  return [overlayRef, {showOverlay, hideOverlay}];
};
