import React, {
  FC,
  createContext,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import { deepEqual } from 'mathjs';
import { generateTotals } from '../utils';

import { Solution, SolveableLevel } from '../types';

const LevelsContext = createContext<LevelsValue | null>(null);
const CellStatus = {
  OPEN: -1,
  DISABLED: -2,
};

export const LevelsProvider: FC<LevelsProviderProps> = ({
  levelIndex: initialLevelIndex,
  levels: initialLevels,
  blockSize = 32,
  children,
}) => {
  const compareBoard = (
    solution: Solution,
    enabledBoard: Solution
  ): CompareBoardReturn => {
    if (!enabledBoard || !solution) {
      return false;
    }

    return deepEqual(solution, enabledBoard);
  };

  const openSolutions = (): Board[] => {
    const boards =
      levels.length > 0
        ? levels.map(l => l.solution.map(r => r.map(c => CellStatus.OPEN)))
        : [];
    return boards;
  };

  const [levels, setLevels] = useState<SolveableLevel[]>(initialLevels);
  const [levelIndex, setLevelIndex] = useState(initialLevelIndex);
  const [enabledBoards, setEnabledBoards] = useState<Board[]>([]);
  const [disabledBoards, setDisabledBoards] = useState<Board[]>([]);
  const [enabledBoard, setEnabledBoard] = useState<Board>([]);
  const [disabledBoard, setDisabledBoard] = useState<Board>([]);
  const [layerIndex, setLayerIndex] = useState(0);
  const [buttonDown, setButtonDown] = useState<number | null>(null);
  const [buttonDownValue, setButtonDownValue] = useState<number | null>(null);

  useEffect(() => {
    setEnabledBoard(enabledBoards[levelIndex]);
    setDisabledBoard(disabledBoards[levelIndex]);
    setLayerIndex(0);
  }, []);

  useEffect(() => {
    setLevelIndex(initialLevelIndex);

    const openBoards = openSolutions();
    setEnabledBoards([...openBoards]);
    setDisabledBoards([...openBoards]);

    setEnabledBoard(openBoards[initialLevelIndex]);
    setDisabledBoard(openBoards[initialLevelIndex]);
  }, [levels, initialLevelIndex]);

  /*
  useEffect(() => {
    setEnabledBoard(enabledBoards[levelIndex]);
  }, [enabledBoards]);

  useEffect(() => {
    setDisabledBoard(disabledBoards[levelIndex]);
  }, [disabledBoards]);
  */

  const mouseDown = (e: MouseEvent, row: number, col: number) => {
    const { button } = e;
    setButtonDown(button);

    if (button === 0) {
      const buttonValue =
        enabledBoards[levelIndex][row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN;

      console.log('Left down', buttonValue);
      setButtonDownValue(buttonValue);
      enabledBoards[levelIndex][row][col] = buttonValue;
      setEnabledBoards(enabledBoards);
      setEnabledBoard(enabledBoards[levelIndex]);
      return;
    } else if (button === 2) {
      const buttonValue =
        disabledBoards[levelIndex][row][col] === CellStatus.OPEN
          ? layerIndex
          : CellStatus.OPEN;

      console.log('Right down', buttonValue);
      setButtonDownValue(buttonValue);
      disabledBoards[levelIndex][row][col] = buttonValue;
      console.log(enabledBoards[levelIndex]);
      console.log(disabledBoards[levelIndex]);
      setDisabledBoards(disabledBoards);
      setDisabledBoard(disabledBoards[levelIndex]);
      return;
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
      setEnabledBoards([...enabledBoards]);
      setEnabledBoard(enabledBoards[levelIndex]);
    } else if (buttonDown === 2) {
      disabledBoards[levelIndex][row][col] = buttonDownValue;
      setDisabledBoards([...disabledBoards]);
      setDisabledBoard(disabledBoards[levelIndex]);
    }
  };

  const mouseUp = () => {
    setButtonDown(null);
    setButtonDownValue(null);
  };

  /*
  const toggleEnabled = (row: number, col: number) => {
    if (!buttonDownValue) {
      return;
    }

    if (disabledBoards[levelIndex][row][col] === CellStatus.OPEN) {
      enabledBoards[levelIndex][row][col] = buttonDownValue;
      setEnabledBoards([...enabledBoards]);
      setEnabledBoard(enabledBoards[levelIndex]);
    } else if (disabledBoards[levelIndex][row][col] === layerIndex) {
      enabledBoards[levelIndex][row][col] = CellStatus.OPEN;
      setEnabledBoards([...enabledBoards]);
      setEnabledBoard(enabledBoards[levelIndex]);
      return;
    } else {
      console.error('Unknown cell value detected when toggling enabled');
    }
  };

  const toggleDisabled = (row: number, col: number) => {
    if (!buttonDownValue) {
      return;
    }

    console.log(
      `About to affect cell (${row}, ${col}) with current value of ${disabledBoards[levelIndex][row][col]}`
    );
    if (disabledBoards[levelIndex][row][col] === CellStatus.OPEN) {
      disabledBoards[levelIndex][row][col] = layerIndex;
      setDisabledBoards([...disabledBoards]);
      setDisabledBoard(disabledBoards[levelIndex]);
    } else if (disabledBoards[levelIndex][row][col] === layerIndex) {
      disabledBoards[levelIndex][row][col] = CellStatus.OPEN;
      setDisabledBoards([...disabledBoards]);
      setDisabledBoard(disabledBoards[levelIndex]);
    } else {
      console.log('nope');
    }
  };
  */

  const level = levels[levelIndex];

  if (!level) {
    return null;
  }

  const width = level.solution[0].length;
  const height = level.solution.length;
  const { colors, solution } = level;
  const color = colors[layerIndex];
  const [top, left, bottom, right] = generateTotals(colors, solution)[
    layerIndex
  ];

  const value: LevelsValue = {
    levels,
    level,
    setLevels,
    levelIndex,
    setLevelIndex,
    layerIndex,
    setLayerIndex,
    width,
    height,
    enabledBoard,
    disabledBoard,
    color,
    colors,
    totals: { top, right, bottom, left },
    mouseDown,
    mouseMove,
    mouseUp,
    buttonDown,
    //toggleDisabled,
    //toggleEnabled,
    blockSize,
  };

  return (
    <LevelsContext.Provider value={value}>{children}</LevelsContext.Provider>
  );
};

export const LevelsConsumer = LevelsContext.Consumer;

export default LevelsContext;

type Total = Board;
type Totals = { top: Total; right: Total; bottom: Total; left: Total };
interface LevelsValue {
  levels: SolveableLevel[];
  level: SolveableLevel;
  setLevels: (levels: SolveableLevel[]) => void;
  levelIndex: number;
  setLevelIndex: (index: number) => void;
  layerIndex: number;
  setLayerIndex: (index: number) => void;
  enabledBoard: Board;
  disabledBoard: Board;
  color: string;
  colors: string[];
  width: number;
  height: number;
  totals: Totals;
  mouseDown: (e: MouseEvent, row: number, col: number) => void;
  mouseMove: (row: number, col: number) => false | undefined;
  mouseUp: (e: MouseEvent) => void;
  //toggleEnabled: (row: number, col: number) => void;
  //toggleDisabled: (row: number, col: number) => void;
  buttonDown: number | null;
  blockSize: number;
}

type Board = number[][];

interface LevelsProviderProps {
  levelIndex: number;
  levels: SolveableLevel[];
  blockSize?: number;
}

type CompareBoardReturn =
  | number
  | math.BigNumber
  | math.Fraction
  | math.Complex
  | math.Unit
  | number[]
  | Board
  | math.Matrix
  | boolean;
