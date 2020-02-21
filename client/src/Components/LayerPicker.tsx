import React from 'react';

import { LevelsConsumer } from '../Contexts/Levels';
import { Row, LayerBlock } from './index';

const LayerPicker = () => {
  return (
    <LevelsConsumer>
      {props => {
        if (!props) {
          return null;
        }

        const { colors, blockSize, level, setLayerIndex } = props;

        if (!level) {
          return null;
        }

        return (
          <Row style={{ marginBottom: '1.5rem' }}>
            {colors.map((color, index) => (
              <LayerBlock
                enabledState={1}
                color={color}
                onClick={() => setLayerIndex(index)}
                size={blockSize}
                key={`${level.title}-color-${index}`}
              >
                {color}
              </LayerBlock>
            ))}
          </Row>
        );
      }}
    </LevelsConsumer>
  );
};

export default LayerPicker;
