import React, { FC } from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Col: FC<{}> = ({ children }) => <StyledRow>{children}</StyledRow>;

export default Col;
