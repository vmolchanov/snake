export const useSvg = (svgRef) => {
  const setSvgHeight = (height) => {
    svgRef.current.style.height = `${height}px`;
  };

  const setSvgWidth = (width) => {
    svgRef.current.style.width = `${width}px`;
  };

  return [svgRef, {setSvgHeight, setSvgWidth}];
};
