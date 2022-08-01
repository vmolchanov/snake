export const useContainer = (containerRef) => {
  const getContainerHeight = () => {
    const {height} = containerRef.current.getBoundingClientRect();
    return Math.floor(height);
  };

  const getContainerWidth = () => {
    const {width} = containerRef.current.getBoundingClientRect();
    return Math.floor(width);
  };

  return [containerRef, {getContainerHeight, getContainerWidth}];
};
