import React, { FC } from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
`;

const Row: FC<{}> = ({ children }) => <StyledRow>{children}</StyledRow>;

export default Row;
