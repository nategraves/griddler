type Solution = number[][];
type Colors = string[];

type Level = {
  title: string;
  colors: Colors;
  solution: Solution;
};

type SolveableLevel = Level & { solved: boolean };

export { Level, Solution, Colors, SolveableLevel };
