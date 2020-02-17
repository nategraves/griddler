import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Block, Board, Totals, Row, Col } from "./index";
import { Level } from "../types";
import { LevelsConsumer } from "../Contexts/Levels";
import { UIConsumer } from "../Contexts/UI";

interface GriddlerProps {
  levels: Level[];
}

const Main = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: 8px solid #111;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

const Skew = styled.div`
  align-items: center;
  box-shadow: -4px 4px 2px #00000055;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LevelSelect = styled(Link)<{ size: number }>`
  align-items: center;
  background: #fff;
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

const Griddler: FC<GriddlerProps> = ({ levels }) => {
  return (
    <LevelsConsumer>
      {levelsProps => {
        if (!levelsProps) {
          return null;
        }

        const {} = levelsProps;

        return (
          <UIConsumer>
            {uiProps => {
              if (!uiProps) {
                return null;
              }

              const { blockSize } = uiProps;

              return (
                <Main>
                  <Row>
                    {levels.map((level, index) => (
                      <LevelSelect
                        size={blockSize}
                        to={`/${index}`}
                        key={`level-${index}-${level.title}`}
                      >
                        {index + 1}
                      </LevelSelect>
                    ))}
                  </Row>
                  <h1>
                    {levelIndex + 1}: {title} ({width()}, {height()})
                  </h1>
                  <Row style={{ marginBottom: "1.5rem" }}>
                    {colors.map((color, index) => (
                      <Block
                        enabledState={1}
                        color={color}
                        onClick={() => setLayerIndex(index)}
                        size={blockSize}
                        key={`${level.title}-color-${index}`}
                      >
                        {color}
                      </Block>
                    ))}
                  </Row>
                  <Skew>
                    <Totals totals={top} color={color} />
                    <Row>
                      <Totals totals={left} color={color} />
                      <Row>
                        <Board
                          enabledBoard={enabledBoard}
                          disabledBoard={disabledBoard}
                        />
                      </Row>
                      <Col>
                        {right.map((totals: any[], i: number) => (
                          <Row key={`right-row-${i}`}>
                            {totals.map((total, j) => (
                              <Block
                                color={color}
                                enabledState={1}
                                size={blockSize}
                                key={`right-total-${i}-${j}`}
                              >
                                {total}
                              </Block>
                            ))}
                          </Row>
                        ))}
                      </Col>
                    </Row>
                    <Row>
                      {bottom.map((totals: any[], i: number) => (
                        <Col key={`bottom-col-${i}`}>
                          {totals.map((total, j) => (
                            <Block
                              color={color}
                              enabledState={1}
                              size={blockSize}
                              key={`bottom-total-${i}-${j}`}
                            >
                              {total}
                            </Block>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  </Skew>
                </Main>
              );
            }}
          </UIConsumer>
        );
      }}
    </LevelsConsumer>
  );
};

export default Griddler;
