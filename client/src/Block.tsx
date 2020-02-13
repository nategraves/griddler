import React, { FC, useState } from "react";
import Color from "color";
import { url } from "inspector";
import styled from "styled-components";

const OPEN = -1;
const white = "#eee";
const black = "#111";

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

const Block: FC<BlockProps> = ({
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
  children
}) => {
  const bg = enabledState === OPEN && disabledState === OPEN ? white : color;
  const disabled = disabledState === layerIndex;
  const backgroundImage = `url(${
    disabled
      ? `repeating-linear-gradient(
          45deg,transparent,transparent 3px,${bg} 3px,${bg} 6px
        )`
      : "none"
  })`;
  const textColor = Color(bg).isLight() ? black : white;

  const StyledBlock = styled.div`
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    cursor: ${disabled ? "default" : "pointer"};
    display: flex;
    justify-content: center;
    position: relative;
    background-color: ${disabled ? white : bg};
    background-image: ${backgroundImage};
    color: ${textColor};
    font-size: ${size / 3}px;
    height: ${size}px;
    transition: all ${transitionTime}s ease-in-out;
    width: ${size}px;
  `;

  return (
    <StyledBlock
      onClick={e => {
        e.preventDefault();
        onClick && onClick(row, col);
      }}
      onContextMenu={e => {
        e.preventDefault();
        onRightClick && onRightClick(row, col);
      }}
      onMouseDown={e => {
        e.preventDefault();
        onMouseDown && onMouseDown(e, row, col);
      }}
      onMouseMove={e => {
        e.preventDefault();

        onMouseMove && onMouseMove(row, col);
      }}
      onMouseUp={e => {
        e.preventDefault();

        onMouseUp && onMouseUp(row, col);
      }}
    >
      {children}
    </StyledBlock>
  );
};

export default Block;
