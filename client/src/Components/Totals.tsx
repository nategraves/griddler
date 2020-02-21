import React, { FC } from 'react';

import { LevelsConsumer } from '../Contexts/Levels';
import { Row, Col, TotalBlock } from './index';

interface TotalsProps {
  vertical?: boolean;
  totals: number[][];
  color: string;
}

const Totals: FC<TotalsProps> = ({ vertical = false, totals, color }) => {
  return (
    <LevelsConsumer>
      {props => {
        if (!props) {
          return null;
        }

        const { blockSize } = props;

        return vertical ? (
          <Col>
            {totals.map((rowTotals: any[], i: number) => (
              <Row key={`left-row-${i}`}>
                {rowTotals.map((total, j) => (
                  <TotalBlock
                    color={color}
                    enabledState={1}
                    size={blockSize}
                    key={`left-total-${i}-${j}`}
                  >
                    {total}
                  </TotalBlock>
                ))}
              </Row>
            ))}
          </Col>
        ) : (
          <Row>
            {totals.map((colTotals: any[], i: number) => (
              <Col key={`top-col-${i}`}>
                {colTotals.map((total, j) => (
                  <TotalBlock
                    color={color}
                    enabledState={1}
                    size={blockSize}
                    key={`top-total-${i}-${j}`}
                  >
                    {total}
                  </TotalBlock>
                ))}
              </Col>
            ))}
          </Row>
        );
      }}
    </LevelsConsumer>
  );
};

export default Totals;
