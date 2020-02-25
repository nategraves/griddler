import React, {
  FC,
  createContext,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import { deepEqual } from 'mathjs';

import { generateTotals } from '../utils';
import { DisabledBoard, Level, Solution, SolveableLevel } from '../types';

const LevelsContext = createContext<LevelsValue | null>(null);
const OPEN = -1;
const LEFT_BTN = 0;
const RIGHT_BTN = 2;

export const LevelsProvider: FC<LevelsProviderProps> = ({
  levelIndex: _levelIndex,
  levels: initialLevels,
  blockSize = 32,
  children,
}) => {
  const compareBoard = (
    solution: Solution,
    board: Solution
  ): CompareBoardReturn => {
    if (!board || !solution) {
      return false;
    }

    return deepEqual(solution, board);
  };

  const openBoard = (boardLevels: Level[]): Board[] => {
    return boardLevels.map(l => l.solution.map(r => r.map(c => OPEN)));
  };

  const openDisabledBoard = (boardLevels: Level[]): DisabledBoard[] => {
    return boardLevels.map(l => {
      const layers = [];
      for (let i = 0; i < l.colors.length; i += 1) {
        layers.push(l.solution.map(r => r.map(c => OPEN)));
      }

      return layers;
    });
  };

  const [levels, setLevels] = useState<SolveableLevel[]>(initialLevels);
  const [levelIndex, setLevelIndex] = useState(_levelIndex);
  const [boards, setBoards] = useState<Board[]>([]);
  const [disabledBoards, setDisabledBoards] = useState<DisabledBoard[]>([]);
  const [layerIndex, setLayerIndex] = useState(0);
  const [buttonDownValue, setButtonDownValue] = useState<number | null>(null);

  useEffect(() => {
    if (!levels.length) {
      return;
    }

    setLevelIndex(_levelIndex);

    const _boards = openBoard(levels);
    setBoards(_boards);
    const _disabledBoards = openDisabledBoard(levels);
    setDisabledBoards(_disabledBoards);
  }, []);

  const performBlockLogic = (button: number, row: number, col: number) => {
    const cellValue = boards[levelIndex][row][col];
    const disabledCellValue = disabledBoards[levelIndex][layerIndex][row][col];

    const isEnabled = cellValue === layerIndex;
    const isDisabled = disabledCellValue >= 0 || (cellValue >= 0 && !isEnabled);

    let newValue = null;

    if (button === LEFT_BTN) {
      if (isDisabled) {
        return;
      }
      newValue = isEnabled ? OPEN : layerIndex;
      boards[levelIndex][row][col] = newValue;
      setBoards(boards);
    } else if (button === RIGHT_BTN) {
      newValue = disabledCellValue === OPEN ? layerIndex : OPEN;
      disabledBoards[levelIndex][layerIndex][row][col] = newValue;
      setDisabledBoards(disabledBoards);
    } else {
      console.error(`Unhandled Button: ${button}`);
    }

    setButtonDownValue(newValue);
  };

  const mouseDown = ({ button }: MouseEvent, row: number, col: number) => {
    performBlockLogic(button, row, col);
  };

  const mouseEnter = (row: number, col: number) => {
    if (buttonDownValue !== null) {
      performBlockLogic(buttonDownValue, row, col);
    }
  };

  const mouseUp = () => setButtonDownValue(null);

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
    boards,
    disabledBoards,
    color,
    colors,
    totals: { top, right, bottom, left },
    mouseDown,
    mouseEnter,
    mouseUp,
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
  boards: Board[];
  disabledBoards: DisabledBoard[];
  color: string;
  colors: string[];
  width: number;
  height: number;
  totals: Totals;
  mouseDown: (e: MouseEvent, row: number, col: number) => void;
  mouseEnter: (row: number, col: number) => void;
  mouseUp: (e: MouseEvent) => void;
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
