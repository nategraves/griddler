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

      const { levelIndex, enabledBoard } = levelProps;

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
