type LayerTotal = [number[], number[]];
type LayerTotals = LayerTotal[];

let generateTotals = (
  colors: string[], solution: number[][]
): LayerTotals => {
  const layerTotals = [];

  for (let i = 0; i < colors.length; i += 1) {
    let row = [];
    for (let rowIndex = 0; rowIndex < solution.length; rowIndex += 1) {
      let total = [];
      let inGroup = 0;

      for (let colIndex = 0; colIndex < solution[rowIndex].length; colIndex += 1) {
        let current = solution[rowIndex][colIndex];
        
        if (!!inGroup) {
          if (current === i) {
            inGroup += 1
          } else {
            if (inGroup) {
              total.push(inGroup);
              inGroup = 0;
            }
          }
        } else {
          if (current === i) {
            inGroup += 1;
          }
        }

        if (
          colIndex === solution[rowIndex].length - 1
          && current
          && inGroup
        ) {
          total.push(inGroup)
        }
      }
      row.push(total);
    }

    let col = [];
    for (let colIndex = 0; colIndex < solution[0].length; colIndex += 1) {
      let total = [];
      let inGroup = 0;

      for (let rowIndex = 0; rowIndex < solution.length; rowIndex += 1) {
        let current = solution[rowIndex][colIndex];

        if (inGroup) {
          if (current === i) {
            inGroup += 1
          } else {
            if (inGroup) {
              total.push(inGroup);
              inGroup = 0;
            }
          }
        } else {
          if (current === i) {
            inGroup += 1;
          }
        }

        if (
          rowIndex === solution.length - 1
          && current
          && inGroup
        ) {
          total.push(inGroup);
        }
      }
      col.push(total);
    }
    layerTotals.push([ row, col ]);
  }

  return layerTotals;
}

export { generateTotals };
