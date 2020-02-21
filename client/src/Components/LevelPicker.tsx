import React from 'react';
import styled from 'styled-components';

import { Row } from './index';
import { LevelsConsumer } from '../Contexts/Levels';

const LevelSelect = styled.div<{ size: number; isActive?: boolean }>`
  align-items: center;
  background: ${({ isActive }) => (isActive ? '#ee0' : '#fff')};
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: ${({ size }) => size / 4}px;
  color: #111;
  cursor: pointer;
  display: inline-flex;
  height: ${({ size }) => size}px;
  justify-content: center;
  margin-right: ${({ size }) => size / 4}px;
  padding: ${({ size }) => size / 4}px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  width: ${({ size }) => size}px;

  &:hover {
    background: #eee;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const LevelPicker = () => (
  <LevelsConsumer>
    {props => {
      if (!props) {
        return null;
      }

      const { levels, blockSize, levelIndex, setLevelIndex } = props;

      return (
        <Row>
          {levels.map((level, index) => (
            <LevelSelect
              size={blockSize}
              onClick={() => setLevelIndex(index)}
              key={`level-${index}-${level.title}`}
              isActive={levelIndex === index}
            >
              {index + 1}
            </LevelSelect>
          ))}
        </Row>
      );
    }}
  </LevelsConsumer>
);

export default LevelPicker;
