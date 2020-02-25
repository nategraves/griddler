import React, { FC } from 'react';
import styled from 'styled-components';

import { Props } from './Levels';
import { generateTotals } from '../utils';
import { LayerPicker, Board, Totals, Row, LevelPicker } from './index';

const Main = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: 8px solid #111;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  padding: 2rem;
`;

const Skew = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Griddler: FC<Props> = ({
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
}) => {
  if (!levels) {
    return null;
  }

  const level = levels[levelIndex];

  if (!level) {
    return null;
  }

  const { title, colors, solution } = level;
  const width = level.solution[0].length;
  const height = level.solution.length;
  const color = colors[layerIndex];
  const [top, left, bottom, right] = generateTotals(colors, solution)[
    layerIndex
  ];

  const blockSize = 32;

  return (
    <Main>
      <LevelPicker />
      <h1>
        {levelIndex + 1}: {title} ({width}, {height})
      </h1>
      <LayerPicker
        colors={colors}
        blockSize={blockSize}
        level={level}
        setLayerIndex={setLayerIndex}
      />
      <Skew style={{ backgroundColor: color }}>
        <Totals totals={top} color={color} />
        <Row>
          <Totals totals={left} color={color} vertical />
          <Row>
            <Board
              boards={boards}
              disabledBoards={disabledBoards}
              levelIndex={levelIndex}
            />
          </Row>
          <Totals totals={right} color={color} vertical />
        </Row>
        <Totals totals={bottom} color={color} />
      </Skew>
    </Main>
  );
};

export default Griddler;
