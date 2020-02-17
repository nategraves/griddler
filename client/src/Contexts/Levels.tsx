import React, { FC, createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deepEqual } from "mathjs";
import { generateTotals } from "../utils";

import { Levels } from "../gql";
import { Level, Solution } from "../types";
import { client } from "../gql";
import { ApolloQueryResult } from "apollo-boost";

type SolveableLevel = Level & { solved: boolean };

interface LevelsValue {
  level: SolveableteLevel;
  setLevels: (levels: Level[]) => void;
  levelIndex: number;
  setLevelIndex: (index: number) => void;
  layerIndex: number;
  setLayerIndex: (index: number) => void;
  enabledBoard: number[][];
  disabledBoard: number[][];
  color: string;
  width: number;
  height: number;
}

const LevelsContext = createContext<LevelsValue | null>(null);
const LEVEL_START = 0;
const CellStatus = {
  OPEN: -1,
  DISABLED: -2
};

export const LevelsProvider: FC<{}> = ({ children }) => {
  const { id } = useParams();
  const levelId = id ? parseInt(id, 10) : LEVEL_START;
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

  const openSolutions = () =>
    levels.length > 0
      ? levels.map(l => l.solution.map(r => r.map(c => CellStatus.OPEN)))
      : [];

  const [levels, setLevels] = useState<SolveableLevel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    const load = async () => {
      setLoading(true);

      type LevelsRepsonse = { levels: Level[] };
      try {
        const response: ApolloQueryResult<LevelsRepsonse> = await client.query({
          query: Levels
        });

        setLevels(
          response.data.levels.map(level => ({ ...level, solved: false }))
        );
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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

  const { colors, title, solution } = level;
  const color = colors[layerIndex];
  const [top, left, bottom, right] = generateTotals(colors, solution)[
    layerIndex
  ];

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

  const width = () => level.solution[0].length;
  const height = () => level.solution.length;

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const value: LevelsValue = {
    level,
    setLevels,
    levelIndex,
    setLevelIndex,
    layerIndex,
    setLayerIndex,
    width: width(),
    height: height(),
    enabledBoard,
    disabledBoard
  };

  return (
    <LevelsContext.Provider value={value}>{children}</LevelsContext.Provider>
  );
};

export const LevelsConsumer = LevelsContext.Consumer;

export default LevelsContext;
