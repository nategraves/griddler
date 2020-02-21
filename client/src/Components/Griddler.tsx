import React from 'react';
import styled from 'styled-components';

import { LayerPicker, Board, Totals, Row, LevelPicker } from './index';
import { LevelsConsumer } from '../Contexts/Levels';

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

const Griddler = () => (
  <LevelsConsumer>
    {levelsProps => {
      if (!levelsProps) {
        return null;
      }

      const {
        levels,
        levelIndex,
        level,
        width,
        height,
        totals,
        setLayerIndex,
        color,
        blockSize,
      } = levelsProps;
      const { title, colors } = level;
      const { top, right, bottom, left } = totals;

      return (
        <Main>
          <LevelPicker />
          <h1>
            {levelIndex + 1}: {title} ({width}, {height})
          </h1>
          <LayerPicker />
          <Skew style={{ backgroundColor: color }}>
            <Totals totals={top} color={color} />
            <Row>
              <Totals totals={left} color={color} vertical />
              <Row>
                <Board />
              </Row>
              <Totals totals={right} color={color} vertical />
            </Row>
            <Totals totals={bottom} color={color} />
          </Skew>
        </Main>
      );
    }}
  </LevelsConsumer>
);

export default Griddler;
