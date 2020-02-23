import React, { FC } from 'react';

import { Row, LayerBlock } from './index';

interface Props {
  colors: string[];
  blockSize: number;
  level: any;
  setLayerIndex: Function;
}

const LayerPicker: FC<Props> = ({
  colors,
  blockSize,
  level,
  setLayerIndex,
}) => {
  return (
    <Row style={{ marginBottom: '1.5rem' }}>
      {colors.map((color: any, index: any) => (
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
};

export default LayerPicker;
