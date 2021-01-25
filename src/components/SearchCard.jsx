import React from 'react';
import styled from 'styled-components/macro';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0px 3px 6px lightgray, 0px 3px 6px;
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 200px;
`;

const CardOverlay = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
  border-radius: inherit;
  overflow: hidden;
  box-sizing: border-box;
  padding: 8px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const HandleWrapper = styled.h6`
  font-size: 16px;
  padding-bottom: 4px;
`;

const BottomInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
  margin-right: 4px;
`;

export default class Search extends React.PureComponent {
  render() {
    const { photoUrl = '', handle = '', location = '', age = 99, photoCount = 0 } = this.props;

    return (
      <CardContainer>
        <Card>
          <img src={photoUrl} alt="potential date"></img>
          <CardOverlay>
            <HandleWrapper>{handle}</HandleWrapper>
            <BottomInfoRow>
              <span>{location ? `${age} • ${location}` : age}</span>
              {photoCount > 1 && <span>{photoCount}</span>}
            </BottomInfoRow>
          </CardOverlay>
        </Card>
      </CardContainer>
    );
  }
}
