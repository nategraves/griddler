import React, { FC } from "react";

import { UIConsumer } from "../Contexts/UI";
import { Row, Col, Block } from "./index";

interface TotalsProps {
  vertical?: boolean;
  totals: number[][];
  color: string;
}

const Totals: FC<TotalsProps> = ({ vertical = false, totals, color }) => {
  return (
    <UIConsumer>
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
                  <Block
                    color={color}
                    enabledState={1}
                    size={blockSize}
                    key={`left-total-${i}-${j}`}
                  >
                    {total}
                  </Block>
                ))}
              </Row>
            ))}
          </Col>
        ) : (
          <Row>
            {totals.map((colTotals: any[], i: number) => (
              <Col key={`top-col-${i}`}>
                {colTotals.map((total, j) => (
                  <Block
                    color={color}
                    enabledState={1}
                    size={blockSize}
                    key={`top-total-${i}-${j}`}
                  >
                    {total}
                  </Block>
                ))}
              </Col>
            ))}
          </Row>
        );
      }}
    </UIConsumer>
  );
};

export default Totals;
