import React, { FC, Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Level, Solution } from "../types";
import { deepEqual } from "mathjs";
import styled from "styled-components";

import { generateTotals } from "../utils";
import { Block, Totals, Row, Col } from "./index";

interface GriddlerProps {
  levels: Level[];
}

const LEVEL_START = 0;
const CellStatus = {
  OPEN: -1,
  DISABLED: -2
};

const Main = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: 8px solid #111;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Skew = styled.div`
  align-items: center;
  box-shadow: -4px 4px 2px #00000055;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LevelSelect = styled(Link)`
  align-items: center;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: ${BLOCK_SIZE / 4}px;
  color: #111;
  cursor: pointer;
  display: inline-flex;
  height: ${BLOCK_SIZE}px;
  justify-content: center;
  margin-right: ${BLOCK_SIZE / 4}px;
  padding: ${BLOCK_SIZE / 4}px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  width: ${BLOCK_SIZE}px;

  &:hover {
    background: #eee;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

type SolveableLevel = Level & { solved: boolean };

const Griddler: FC<GriddlerProps> = ({ levels: initialLevels }) => {
  const openSolutions = () =>
    levels.map(l => l.solution.map(r => r.map(c => CellStatus.OPEN)));

  const compareBoard = (
    solution: Solution,
    enabledBoard: Solution
  ):
    | number
    | math.BigNumber
    | math.Fraction
    | math.Complex
    | math.Unit
    | number[]
    | number[][]
    | math.Matrix => {
    return deepEqual(solution, enabledBoard);
  };

  const [levels, setLevels] = useState<SolveableLevel[]>(
    initialLevels.map(level => ({ ...level, solved: false }))
  );
  const { id } = useParams();
  const levelId = id ? parseInt(id, 10) : LEVEL_START;
  const [levelIndex, setLevelIndex] = useState(levelId);
  const [level, setLevel] = useState(levels[levelIndex]);
  const [enabledBoards, setEnabledBoards] = useState(openSolutions());
  const [disabledBoards, setDisabledBoards] = useState(openSolutions());
  const [enabledBoard, setEnabledBoard] = useState(enabledBoards[levelId]);
  const [disabledBoard, setDisabledBoard] = useState(disabledBoards[levelId]);
  const [layerIndex, setLayerIndex] = useState(0);
  const [buttonDown, setButtonDown] = useState<number | null>(null);
  const [buttonDownValue, setButtonDownValue] = useState<number | null>(null);

  useEffect(() => {
    const levelIndex = id ? parseInt(id, 10) : LEVEL_START;
    setLevelIndex(levelIndex);
    setLevel(levels[levelIndex]);
    setLayerIndex(0);
  }, [levelIndex, levels, id]);

  useEffect(() => {
    console.log(`Setting enabled and disabled boards`);
    setEnabledBoard(enabledBoards[levelIndex]);
    setDisabledBoard(disabledBoards[levelIndex]);
  }, [levelIndex, enabledBoards, disabledBoards]);

  useEffect(() => {
    const same = compareBoard(level.solution, enabledBoard);
    levels[levelIndex].solved = !!same;
    setLevels(levels);
  }, [compareBoard, enabledBoard]);

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
      setDisabledBoards(disabledBoards);
    }
  };

  const clearDisabledBoard = () => {
    disabledBoards[levelIndex] = getCleanBoard();
  };

  const clearEnabledBoard = () => {
    enabledBoards[levelIndex] = getCleanBoard();
  };

  const mouseDown = (e: MouseEvent, row: number, col: number) => {
    const { button } = e;
    setButtonDown(button);

    if (button === 0) {
      if (disabledBoard[row][col] === layerIndex) {
        return;
      }
      const buttonValue =
        enabledBoards[levelIndex][row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN;
      enabledBoards[levelIndex][row][col] = buttonValue;
      setButtonDownValue(buttonValue);
      setEnabledBoards(enabledBoards);
    } else if (button === 2) {
      const buttonValue =
        disabledBoards[levelIndex][row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN;
      disabledBoards[levelIndex][row][col] = buttonValue;
      setButtonDownValue(buttonValue);
      setDisabledBoards(disabledBoards);
    } else {
      console.error(`Unhandled Button: ${button}`);
    }
  };

  const mouseMove = (row: number, col: number) => {
    if (
      buttonDown === null ||
      buttonDownValue === null ||
      disabledBoards[levelIndex][row][col] === layerIndex
    ) {
      return false;
    }

    if (buttonDown === 0) {
      enabledBoards[levelIndex][row][col] = buttonDownValue;
      setEnabledBoards(enabledBoards);
    } else if (buttonDown === 2) {
      disabledBoards[levelIndex][row][col] = buttonDownValue;
      setDisabledBoards(disabledBoards);
    }
  };

  const mouseUp = () => {
    setButtonDown(null);
    setButtonDownValue(null);
  };

  const toggleEnabled = (row: number, col: number) => {
    if (disabledBoards[levelIndex][row][col] === layerIndex) {
      return false;
    }
    enabledBoards[levelIndex][row][col] =
      enabledBoards[levelIndex][row][col] === CellStatus.OPEN
        ? layerIndex
        : CellStatus.OPEN;
    setEnabledBoards(enabledBoards);
  };

  const toggleDisabled = (row: number, col: number) => {
    disabledBoards[levelIndex][row][col] =
      disabledBoards[levelIndex][row][col] === CellStatus.OPEN
        ? layerIndex
        : CellStatus.OPEN;
    setDisabledBoards(disabledBoards);
  };

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
            <LevelSelect to={`/${index}`} key={`level-${index}-${level.title}`}>
              {index + 1}
            </LevelSelect>
          ))}
        </Row>
        <h1>
          {levelIndex + 1}: {title} ({width()}, {height()})
        </h1>
        <Row style={{ marginBottom: "1.5rem" }}>
          {colors.map((color, index) => (
            <Block
              enabledState={1}
              color={color}
              onClick={() => setLayerIndex(index)}
              size={BLOCK_SIZE}
              key={`${level.title}-color-${index}`}
            >
              {color}
            </Block>
          ))}
        </Row>
        <Skew>
          <Totals totals={top} color={color} />
          <Row>
            <Totals totals={left} color={color} />
            <Row>
              <Board
                style={{
                  gridTemplateColumns: `repeat(${disabledBoard[0].length}, 1fr)`,
                  gridTemplateRows: `repeat(${disabledBoard.length}, 1fr)`
                }}
              >
                {disabledBoard.map((row: any[], rowIndex: number) =>
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
              </Board>
            </Row>
            <Col>
              {right.map((totals: any[], i: number) => (
                <Row key={`right-row-${i}`}>
                  {totals.map((total, j) => (
                    <Block
                      color={color}
                      enabledState={1}
                      size={BLOCK_SIZE}
                      key={`right-total-${i}-${j}`}
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
              <Col key={`bottom-col-${i}`}>
                {totals.map((total, j) => (
                  <Block
                    color={color}
                    enabledState={1}
                    size={BLOCK_SIZE}
                    key={`bottom-total-${i}-${j}`}
                  >
                    {total}
                  </Block>
                ))}
              </Col>
            ))}
          </Row>
        </Skew>
      </Main>
    </Fragment>
  );
};

export default Griddler;
