import React, { FC } from 'react';
import Color from 'color';
import styled from 'styled-components';

const OPEN = -1;
const white = '#eee';
const black = '#111';

interface BlockProps {
  enabledState?: number;
  disabledState?: number;
  row?: number | null;
  col?: number | null;
  layerIndex?: number;
  onMouseDown?: Function;
  onMouseMove?: Function;
  onMouseUp?: Function;
  onClick?: Function;
  onRightClick?: Function;
  buttonDown?: any;
  size: number;
  color: string;
  transitionTime?: number;
}

const Container = styled.div`
  transition: 0.25s all ease-in-out;
  
  &:hover {
    box-shadow: 2px 2px 2px #000000aa: 
  }
`;

const LayerBlock: FC<BlockProps> = ({
  enabledState = OPEN,
  disabledState = OPEN,
  row,
  col,
  layerIndex,
  onMouseDown,
  onMouseMove,
  onClick,
  onMouseUp,
  onRightClick,
  buttonDown,
  size,
  color,
  transitionTime = 0.2,
  children,
}) => {
  const backgroundColor =
    enabledState === OPEN ? (disabledState === OPEN ? white : color) : color;
  const disabled = disabledState === layerIndex;
  const backgroundImage = `${
    disabled
      ? `repeating-linear-gradient(
          45deg,transparent,transparent 3px,${white} 3px,${white} 6px
        )`
      : 'none'
  }`;
  const textColor = Color(backgroundColor).isLight() ? black : white;

  return (
    <Container
      style={{
        alignItems: 'center',
        backgroundColor,
        backgroundImage,
        border: '1px solid rgba(0, 0, 0, 0.4)',
        boxSizing: 'border-box',
        color: `${textColor}`,
        cursor: `${disabled || !onClick ? 'default' : 'pointer'}`,
        display: 'flex',
        fontSize: `${size / 3}px`,
        height: `${size}px`,
        justifyContent: 'center',
        position: 'relative',
        transition: `all ${transitionTime}s ease-in-out`,
        width: `${size}px`,
      }}
      onClick={() => onClick && onClick(row, col)}
      onContextMenu={e => {
        e.preventDefault();
        onRightClick && onRightClick(row, col);
      }}
      onMouseDown={e => onMouseDown && onMouseDown(e, row, col)}
      onMouseMove={() => onMouseMove && onMouseMove(row, col)}
      onMouseUp={() => onMouseUp && onMouseUp(row, col)}
    >
      {children}
    </Container>
  );
};

export default LayerBlock;
