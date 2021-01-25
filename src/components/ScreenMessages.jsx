import styled from 'styled-components/macro';

export const ScreenMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 4em;
  text-align: center;
  @media screen and (max-width: 500px) {
    font-size: 2em;
  }
`;

export const ErrorMessage = styled(ScreenMessage)`
  color: red;
`;
