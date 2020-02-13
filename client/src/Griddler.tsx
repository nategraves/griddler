import React, { FC, Fragment, useState } from "react";
import { Level } from "./types";
import { deepEqual, matrix } from "mathjs";
import styled from "styled-components";

import { generateTotals } from "./utils";
import Block from "./Block";

interface GriddlerProps {
  levels: Level[];
}

const Griddler: FC<GriddlerProps> = ({ levels }) => {
  const LEVEL_START = 0;
  const BLOCK_SIZE = 32;
  const CellStatus = {
    OPEN: -1,
    DISABLED: -2
  };

  const [levelIndex, setLevelIndex] = useState(LEVEL_START);
  const [level, setLevel] = useState(levels[LEVEL_START]);
  const [enabledBoards, setEnabledBoards] = useState(
    levels.map(l => l.solution.map(r => r.map(c => CellStatus.OPEN)))
  );
  const [disabledBoards, setDisabledBoards] = useState(
    levels.map(l => l.solution.map(r => r.map(c => CellStatus.OPEN)))
  );
  const [enabledBoard, setEnabledBoard] = useState(enabledBoards[LEVEL_START]);
  const [disabledBoard, setDisabledBoard] = useState(
    enabledBoards[LEVEL_START]
  );
  const [layerIndex, setLayerIndex] = useState(0);
  const [buttonDown, setButtonDown] = useState<number | null>(null);
  const [buttonDownValue, setButtonDownValue] = useState<number | null>(null);

  const width = () => level.solution[0].length;
  const height = () => level.solution.length;

  const getCleanBoard = () => {
    const _board = Array(width()).fill(
      Array(width()).map(() => Array(height()).fill(CellStatus.OPEN))
    );
    return _board;
  };

  const clearBoards = () => {
    if (enabledBoards.length > 0) {
      enabledBoards[levelIndex] = getCleanBoard();
      setEnabledBoards(enabledBoards);
    }
    if (disabledBoards.length > 0) {
      disabledBoards[levelIndex] = getCleanBoard();
    }
  };

  const clearDisabledBoard = () => {
    disabledBoards[levelIndex] = getCleanBoard();
  };

  const clearEnabledBoard = () => {
    enabledBoards[levelIndex] = getCleanBoard();
  };

  const changeLevel = (d: number) => {
    setLevelIndex(levelIndex + d);
    setLevel(levels[levelIndex]);
    setLayerIndex(0);
    const enabledBoard = setEnabledBoard(getCleanBoard());
    const disabledBoard = setDisabledBoard(getCleanBoard());
  };

  const compareBoard = () => {
    const same = deepEqual(matrix(level.solution), matrix(enabledBoard));
    if (same && levelIndex < levels.length) {
      setLevelIndex(levelIndex + 1);
    }
  };

  const updateLevelIndex = (index: number) => setLevelIndex(index);

  const updateLayerIndex = (index: number) => setLayerIndex(index);

  const mouseDown = (e: MouseEvent, row: number, col: number) => {
    setButtonDown(e.button);
    if (buttonDown === 0) {
      if (disabledBoard[row][col] === layerIndex) {
        return;
      }
      setButtonDownValue(
        enabledBoard[row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN
      );
    }
    if (buttonDown === 2) {
      setButtonDownValue(
        disabledBoard[row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN
      );
    }
  };

  const mouseMove = (row: number, col: number) => {
    if (
      buttonDown === null ||
      buttonDownValue === null ||
      disabledBoard[row][col] === layerIndex
    ) {
      return false;
    }
    if (buttonDown === 0) {
      enabledBoard[row][col] = buttonDownValue;
    } else if (buttonDown === 2) {
      disabledBoard[row][col] = buttonDownValue;
    }
  };

  const mouseUp = (row: number, col: number) => {
    setButtonDown(null);
    setButtonDownValue(null);
    compareBoard();
  };

  const toggleEnabled = (row: number, col: number) => {
    if (disabledBoard[row][col] === layerIndex) {
      return false;
    }
    enabledBoard[row][col] =
      enabledBoard[row][col] === CellStatus.OPEN ? layerIndex : CellStatus.OPEN;
    compareBoard();
  };

  const toggleDisabled = (row: number, col: number) => {
    disabledBoard[row][col] =
      disabledBoard[row][col] === CellStatus.OPEN
        ? layerIndex
        : CellStatus.OPEN;
  };

  const Main = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    border: 8px solid #111;
    padding: 0 2rem 2rem;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `;

  const Row = styled.div`
    display: flex;
  `;

  const Col = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const LevelSelect = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    border-radius: ${BLOCK_SIZE / 4}px;
    margin-right: ${BLOCK_SIZE / 4}px;
    padding: ${BLOCK_SIZE / 4}px;
    height: ${BLOCK_SIZE}px;
    width: ${BLOCK_SIZE}px;

    &:last-of-type {
      margin-right: 0;
    }
  `;

  const Board = styled.div`
    display: grid;
    grid-gap: 0px;
    grid-template-columns: repeat(${disabledBoard[0].length}, 1fr);
    grid-template-rows: repeat(${disabledBoard.length}, 1fr);
  `;

  const { colors, title, solution } = level;
  const color = colors[layerIndex];
  const [top, left, bottom, right] = generateTotals(colors, solution)[
    layerIndex
  ];

  return (
    <Fragment>
      <Main>
        <Row>
          {levels.map((level, index) => (
            <LevelSelect onClick={() => setLevelIndex(index)}>
              {index + 1}
            </LevelSelect>
          ))}
        </Row>
        <h1>
          {levelIndex}: {title} ({width()}, {height()})
        </h1>
        <Row>
          {colors.map((color, index) => (
            <Block
              enabledState={1}
              color={color}
              onClick={() => setLayerIndex(index)}
              size={BLOCK_SIZE}
            >
              {color}
            </Block>
          ))}
        </Row>
        <Row>
          {top.map((totals: any[], i: number) => (
            <Col>
              {totals.map((total, j) => (
                <Block
                  color={color}
                  enabledState={1}
                  size={BLOCK_SIZE}
                  key={`${i}${j}`}
                >
                  {total}
                </Block>
              ))}
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            {left.map((totals: any[], i: number) => (
              <Row>
                {totals.map((total, j) => (
                  <Block
                    color={color}
                    enabledState={1}
                    size={BLOCK_SIZE}
                    key={`${i}${j}`}
                  >
                    {total}
                  </Block>
                ))}
              </Row>
            ))}
          </Col>
          <Row>
            <Board>
              {disabledBoard.map((row: any[], rowIndex: number) =>
                row.map((item, colIndex) => (
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
                  />
                ))
              )}
            </Board>
          </Row>
          <Col>
            {right.map((totals: any[], i: number) => (
              <Row>
                {totals.map((total, j) => (
                  <Block
                    color={color}
                    enabledState={1}
                    size={BLOCK_SIZE}
                    key={`${i}${j}`}
                  >
                    {total}
                  </Block>
                ))}
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          {bottom.map((totals: any[], i: number) => (
            <Col>
              {totals.map((total, j) => (
                <Block
                  color={color}
                  enabledState={1}
                  size={BLOCK_SIZE}
                  key={`${i}${j}`}
                >
                  {total}
                </Block>
              ))}
            </Col>
          ))}
        </Row>
      </Main>
    </Fragment>
  );
};

export default Griddler;
