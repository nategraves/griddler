import _ from 'lodash';

type LayerTotal = [any, any, any, any];
type LayerTotals = LayerTotal[];

const generateTotals = (
  colors: string[], solution: number[][]
): LayerTotals => {
  let layerTotals: LayerTotals = [];

  const max = 0;

  for (let i = 0; i < colors.length; i += 1) {
    let row: number[] = [];
    let maxRow = 0;

    for (let rowIndex = 0; rowIndex < solution.length; rowIndex += 1) {
      let total: number[] = [];
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

        if (colIndex === solution[rowIndex].length - 1 && inGroup) {
          total.push(inGroup)
        }
      }

      const count = total.length;

      if (!count) {
        total.push(0);
      }

      if (count > maxRow) {
        maxRow = count;
      }
      if (count > max) {
        max = count;
      }

      row.push(total);
    }

    let col = [];
    let maxCol = 0;

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

        if (rowIndex === solution.length - 1 && inGroup) {
          total.push(inGroup);
        }
      }

      const count = total.length;

      if (!count) {
        total.push(0);
      }

      if (count > maxCol) {
        maxCol = count;
      }

      if (count > max) {
        max = count;
      }

      col.push(total);
    }

    const top = col.map(c => [...Array(maxCol - c.length).fill(''), ...c]);
    const left = row.map(r => [...Array(maxRow - r.length).fill(''), ...r]);
    const bottom = col.map(c => [...c, ...Array(maxCol - c.length).fill('')]);
    const right = row.map(r => [...r, ...Array(maxRow - r.length).fill('')]);

    layerTotals.push([top, left, bottom, right]);
  }

  layerTotals = layerTotals.map(layer => {
    let [top, left, bottom, right] = layer;

    top = top.map(c => [...Array(max - c.length).fill(''), ...c]);
    left = left.map(r => [...Array(max - r.length).fill(''), ...r]);
    bottom = bottom.map(c => [...c, ...Array(max - c.length).fill('')]);
    right = right.map(r => [...r, ...Array(max - r.length).fill('')]);

    return [top, left, bottom, right];
  });

  return _.uniq(layerTotals);
}

const fillColors = (colors: string[], targetSize: number) => {
  const colorCount = colors.length;
  if (colorCount >= targetSize) {
    colors = [...colors.slice(targetSize - 1)];
  }

  for (let i = 0; i < targetSize - colorCount; i += 1) {
    colors = [...colors, colors[_.random(colorCount - 1)]];
  }

  return colors;
}

export { generateTotals, fillColors };
