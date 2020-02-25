import React, { FC } from 'react';
import styled from 'styled-components';

import { BoardBlock } from './index';

interface StyledBoardProps {
  rows: number;
  cols: number;
}

const Container = styled.div``;

const StyledBoard = styled.div<StyledBoardProps>`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
`;

const Board: FC<{
  layerIndex: number;
  levelIndex: number;
  boards: number[][][];
  disabledBoards: number[][][];
  colors: string[];
}> = ({ levelIndex, boards, disabledBoards }) => {
  const enabledBoard = boards[levelIndex];
  const disabledBoard = disabledBoards[levelIndex];
  const color = colors[layerIndex];
  console.log(enabledBoard);

  if (!enabledBoard || enabledBoard.length === 0) {
    return null;
  }

  return (
    <StyledBoard rows={enabledBoard.length} cols={enabledBoard[0].length}>
      {enabledBoard.map((row: any[], rowIndex: number) =>
        row.map((_item, colIndex) => (
          <BoardBlock
            row={rowIndex}
            col={colIndex}
            enabledBoard={enabledBoard}
            disabledBoard={disabledBoard}
            color={color}
            key={`board-${levelIndex}-${rowIndex}-${colIndex}`}
          />
        ))
      )}
    </StyledBoard>
  );
};

export default Board;
