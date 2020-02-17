import React, { FC } from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
`;

const Row: FC<{ style?: React.CSSProperties }> = ({ children, style }) => (
  <StyledRow style={style}>{children}</StyledRow>
);

export default Row;
