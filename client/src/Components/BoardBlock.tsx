import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import LevelsContext from '../Contexts/Levels';

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

const BoardBlock: FC<BlockProps> = ({
  row,
  col,
  transitionTime = 0.2,
  children,
}) => {
  const context = useContext(LevelsContext);

  if (!context) {
    return null;
  }

  const {
    boards,
    disabledBoards,
    color,
    blockSize,
    mouseDown,
    mouseEnter,
    mouseUp,
    layerIndex,
    levelIndex,
  } = context;

  if (
    !boards ||
    boards.length === 0 ||
    !disabledBoards ||
    disabledBoards.length === 0
  ) {
    return null;
  }

  const enabledState = boards[levelIndex][row][col];
  const disabledCells = disabledBoards[levelIndex].filter(
    b => !!b && b[row][col] >= 0
  );
  debugger;

  //.filter(v => v !== null);

  const disabledState = disabledCells.length > 0;
  const open = enabledState === OPEN && !disabledState;
  const disabled = enabledState !== OPEN || disabledState;
  const backgroundColor = open ? white : disabled ? color : '#CCCCCCCC';
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
      onMouseEnter={() => mouseEnter(row, col)}
      onMouseUp={mouseUp}
    >
      {children}
    </Container>
  );
};

export default BoardBlock;
