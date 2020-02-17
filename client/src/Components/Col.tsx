import React, { FC } from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Col: FC<{ style?: React.CSSProperties }> = ({ children, style }) => (
  <StyledRow style={style}>{children}</StyledRow>
);

export default Col;
