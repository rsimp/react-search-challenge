import React from 'react';
import styled from 'styled-components/macro';

const HeaderContainer = styled.header`
  border-bottom: 1px solid hsl(0, 0%, 94%);
  padding: 16px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <img src="./logo.svg" alt="match" width="110" />
    </HeaderContainer>
  );
}
