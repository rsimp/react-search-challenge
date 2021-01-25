import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  border-bottom: 1px solid hsl(0, 0%, 94%);
  padding: 16px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Link to="/search">
        <img src="/logo.svg" alt="match" width="110" />
      </Link>
    </HeaderContainer>
  );
}
