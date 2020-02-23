import React, { FC } from 'react';
import styled from 'styled-components';

const OPEN = -1;
const white = '#eee';
const black = '#111';

interface BlockProps {
  row: number;
  col: number;
  transitionTime?: number;
}

const Container = styled.div`
  transition: 0.25s all ease-in-out;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;
  
  &:hover {
    box-shadow: 2px 2px 2px #000000aa: 
  }
`;

const BoardBlock: FC<BlockProps & any> = ({
  enabledBoard,
  disabledBoard,
  color,
  blockSize,
  mouseDown,
  mouseMove,
  mouseUp,
  //toggleEnabled,
  //toggleDisabled,
  layerIndex,

  row,
  col,
  transitionTime = 0.2,
  children,
}) => {
  const enabledState = enabledBoard[row][col];
  const disabledState = disabledBoard[row][col];
  const open = enabledState === OPEN && disabledState !== layerIndex;
  const disabled = enabledState !== OPEN || disabledState === layerIndex;
  const backgroundColor = open ? white : disabled ? color : white;
  const backgroundImage = disabled
    ? `repeating-linear-gradient(
        45deg,transparent,transparent 3px,${backgroundColor} 3px,${backgroundColor} 6px
      )`
    : 'none';

  return (
    <Container
      style={{
        backgroundColor,
        backgroundImage,
        cursor: 'pointer',
        height: `${blockSize}px`,
        transition: `all ${transitionTime}s ease-in-out`,
        width: `${blockSize}px`,
      }}
      onContextMenu={e => e.preventDefault()}
      onMouseDown={e => mouseDown(e, row, col)}
      onMouseMove={() => mouseMove(row, col)}
      onMouseUp={mouseUp}
    >
      {children}
    </Container>
  );
};

export default BoardBlock;
