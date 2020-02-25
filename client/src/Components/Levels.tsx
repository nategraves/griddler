import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { deepEqual } from 'mathjs';
import { ApolloQueryResult } from 'apollo-boost';
import { Levels as LevelsQuery, client } from '../gql';

import { Level, Solution, SolveableLevel } from '../types';
import Griddler from './Griddler';

const OPEN = -1;

export const Levels: FC<{}> = () => {
  const compareBoard = (
    solution: Solution,
    enabledBoard: Solution
  ): CompareBoardReturn => {
    if (!enabledBoard || !solution) {
      return false;
    }

    return deepEqual(solution, enabledBoard);
  };

  const openBoard = (boardLevels: Level[]): Board[] => {
    return boardLevels.map(l => l.solution.map(r => r.map(c => OPEN)));
  };

  const { id } = useParams();
  const [levels, setLevels] = useState<SolveableLevel[]>([]);
  const [levelIndex, setLevelIndex] = useState(0);
  const [boards, setBoards] = useState<Board[]>([]);
  const [disabledBoards, setDisabledBoards] = useState<Board[]>([]);
  const [layerIndex, setLayerIndex] = useState(0);
  const [buttonDownValue, setButtonDownValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      type LevelsRepsonse = { levels: Level[] };
      try {
        const response: ApolloQueryResult<LevelsRepsonse> = await client.query({
          query: LevelsQuery,
        });

        const _levels = response.data.levels.map(level => ({
          ...level,
          solved: false,
        }));
        setLevels(_levels);
        const open = openBoard(_levels);
        console.log(open);
        setBoards([...open]);
        setDisabledBoards([...open]);
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const performBlockLogic = (button: number, row: number, col: number) => {
    let enabledValue = boards[levelIndex][row][col];
    let disabledValue = disabledBoards[levelIndex][row][col];
    let newValue = null;

    if (button === 0) {
      if (disabledValue < 0) {
        return;
      }
      newValue = enabledValue === OPEN ? layerIndex : OPEN;
      enabledValue = newValue;
      setBoards([...boards]);
    } else if (button === 2) {
      newValue = disabledValue === OPEN ? -layerIndex : OPEN;
      disabledValue = newValue;
      setBoards([...disabledBoards]);
    } else {
      console.error(`Unhandled Button: ${button}`);
    }
    setButtonDownValue(newValue);
  };

  const mouseDown = ({ button }: MouseEvent, row: number, col: number) =>
    performBlockLogic(button, row, col);

  const mouseEnter = (row: number, col: number) => {
    if (buttonDownValue === null && typeof buttonDownValue === 'number') {
      performBlockLogic(buttonDownValue, row, col);
    }
  };

  const mouseUp = () => setButtonDownValue(null);

  const props: Props = {
    levels,
    levelIndex,
    setLevelIndex,
    layerIndex,
    setLayerIndex,
    boards,
    disabledBoards,
    mouseDown,
    mouseEnter,
    mouseUp,
  };

  return (
    <Switch>
      <Route path="/:id">
        <Griddler {...props} />;
        <Griddler {...props} />
      </Route>
      <Route path="/">
        <Griddler {...props} />
      </Route>
    </Switch>
  );
};

export default Levels;

type Total = Board;
type Totals = { top: Total; right: Total; bottom: Total; left: Total };

export type Props = {
  levels: SolveableLevel[];
  levelIndex: number;
  setLevelIndex: (index: number) => void;
  layerIndex: number;
  setLayerIndex: (index: number) => void;
  boards: Board[];
  disabledBoards: Board[];
  mouseDown: (e: MouseEvent, row: number, col: number) => void;
  mouseEnter: (row: number, col: number) => void;
  mouseUp: (e: MouseEvent) => void;
};

type Board = number[][];

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
