/**
 * Original Work
 * http://www.paintassistant.com/rybrgb.html
 * Modified by Dave Eddy <dave@daveeddy.com>
 */

import _ from 'lodash';

const cubicInt = (t, A, B) => A + (t*t*(3-2*t)) * (B-A);

const getR = (iR, iY, iB) => {
  // red
  const x0 = cubicInt(iB, 1.0, 0.163);
  const x1 = cubicInt(iB, 1.0, 0.0);
  const x2 = cubicInt(iB, 1.0, 0.5);
  const x3 = cubicInt(iB, 1.0, 0.2);
  const y0 = cubicInt(iY, x0, x1);
  const y1 = cubicInt(iY, x2, x3);
  return Math.ceil(255 * cubicInt(iR, y0, y1));
}

const getG = (iR, iY, iB) => {
  // green
  const x0 = cubicInt(iB, 1.0, 0.373);
  const x1 = cubicInt(iB, 1.0, 0.66);
  const x2 = cubicInt(iB, 0.0, 0.0);
  const x3 = cubicInt(iB, 0.5, 0.094);
  const y0 = cubicInt(iY, x0, x1);
  const y1 = cubicInt(iY, x2, x3);
  return Math.ceil(255 * cubicInt(iR, y0, y1));
}

const getB = (iR, iY, iB) => {
  // blue
  const x0 = cubicInt(iB, 1.0, 0.6);
  const x1 = cubicInt(iB, 0.0, 0.2);
  const x2 = cubicInt(iB, 0.0, 0.5);
  const x3 = cubicInt(iB, 0.0, 0.0);
  const y0 = cubicInt(iY, x0, x1);
  const y1 = cubicInt(iY, x2, x3);
  return Math.ceil(255 * cubicInt(iR, y0, y1));
}

const ryb2rgb = (color) => {
  const R = color[0] / 255;
  const Y = color[1] / 255;
  const B = color[2] / 255;
  const R1 = getR(R,Y,B) ;
  const G1 = getG(R,Y,B) ;
  const B1 = getB(R,Y,B) ;
  const ret = [ R1, G1, B1 ];
  return ret;
}

const COLOR_RANGE = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
];

const hexColors = _.sortedUniq(
  _.flattenDeep(
    COLOR_RANGE.map(
      c => COLOR_RANGE.map(
        c2 => COLOR_RANGE.map(
          c3 => `${c}${c2}${c3}`
        )
      )
    )
  )
);

export { ryb2rgb, hexColors };