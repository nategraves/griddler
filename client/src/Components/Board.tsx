import React, { FC } from "react";
import styled from "styled-components";

import { Block } from "./index";

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

interface BoardProps {
  enabledBoard: number[][];
  disabledBoard: number[][];
}

const Board: FC<BoardProps> = ({ enabledBoard, disabledBoard }) => (
  <StyledBoard rows={enabledBoard.length} cols={enabledBoard[0].length}>
    {enabledBoard.map((row: any[], rowIndex: number) =>
      row.map((_item, colIndex) => (
        <Block
          enabledState={enabledBoard[rowIndex][colIndex]}
          disabledState={disabledBoard[rowIndex][colIndex]}
          row={rowIndex}
          col={colIndex}
          layerIndex={layerIndex}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onClick={toggleEnabled}
          onRightClick={toggleDisabled}
          buttonDown={buttonDown}
          size={BLOCK_SIZE}
          color={colors[layerIndex]}
          key={`board-${rowIndex}-${colIndex}`}
        />
      ))
    )}
  </StyledBoard>
);

export default Board;
