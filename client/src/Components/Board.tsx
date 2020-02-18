import React, { FC } from "react";
import styled from "styled-components";

import { UIConsumer } from '../Contexts/UI';
import { LevelsConsumer } from '../Contexts/Levels';
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
  <UIConsumer>
    {uiProps => {
      if (!uiProps) {
        return null;
      }

      const { blockSize } = uiProps;

      return (
        <LevelsConsumer>
          {levelProps => {
            if (!levelProps) {
              return null;
            }

            const { layerIndex, mouseUp, mouseMove, mouseDown, toggleEnabled, toggleDisabled, buttonDown, color } = levelProps;

            return (
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
                      size={blockSize}
                      color={color}
                      key={`board-${rowIndex}-${colIndex}`}
                    />
                  ))
                )}
              </StyledBoard>
            )
          }}
        </LevelsConsumer>
      )
    }}
  </UIConsumer>
);

export default Board;
