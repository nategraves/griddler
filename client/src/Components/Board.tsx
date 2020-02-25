import React, { FC } from 'react';
import styled from 'styled-components';

import { LevelsConsumer } from '../Contexts/Levels';
import { BoardBlock } from './index';

interface StyledBoardProps {
  rows: number;
  cols: number;
}

const StyledBoard = styled.div<StyledBoardProps>`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: repeat(${({ cols }) => cols}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
`;

const Board: FC<{}> = () => (
  <LevelsConsumer>
    {levelProps => {
      if (!levelProps) {
        console.error('No LevelsConsumer props');
        return null;
      }

      const { levelIndex, boards, disabledBoards } = levelProps;

      if (!boards || boards.length === 0) {
        return null;
      }

      const board = boards[levelIndex];

      return (
        <StyledBoard rows={board.length} cols={board[0].length}>
          {board.map((row: any[], rowIndex: number) =>
            row.map((_item, colIndex) => (
              <BoardBlock
                row={rowIndex}
                col={colIndex}
                key={`board-${levelIndex}-${rowIndex}-${colIndex}`}
              />
            ))
          )}
        </StyledBoard>
      );
    }}
  </LevelsConsumer>
);

export default Board;
