type Board = number[][];
type DisabledBoard = number[][][];
type Solution = number[][];
type Colors = string[];

type Level = {
  title: string;
  colors: Colors;
  solution: Solution;
};

type SolveableLevel = Level & { solved: boolean };

export { Board, DisabledBoard, Level, Solution, Colors, SolveableLevel };
