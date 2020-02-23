import React, { FC } from 'react';
import styled from 'styled-components';

import { Row } from './index';

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

const LevelPicker: FC<any> = ({
  levels,
  blockSize,
  levelIndex,
  setLevelIndex,
}) => {
  return (
    <Row>
      {levels.map((level: any, index: any) => (
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
};

export default LevelPicker;
