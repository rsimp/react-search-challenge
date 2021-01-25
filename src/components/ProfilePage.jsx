import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { ProfilesContext } from 'context/ProfilesContext';
import { getProfileById, areProfilesLoaded, getLoadProfilesError } from 'context/selectors';

import { loadProfiles } from 'components/SearchPage/async';
import { ScreenMessage, ErrorMessage } from 'components/ScreenMessages';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TopBanner = styled.div`
  display: flex;
  padding: 50px;
  height: 350px;
  align-items: flex-end;
  background-color: lightgray;
  color: #333333;
  text-transform: capitalize;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding: 32px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 48px;
  @media screen and (max-width: 500px) {
    flex-direction: row;
    margin-left: 0px;
    margin-top: 16px;
    align-self: flex-start;
  }
`;

const ImgWrapper = styled.img`
  height: 350px;
  width: 350px;
  @media screen and (max-width: 500px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const NameWrapper = styled.span`
  font-size: 4rem;
  margin-bottom: 24px;
  @media screen and (max-width: 500px) {
    font-size: 2rem;
    margin-bottom: 0px;
    margin-right: 16px;
  }
`;

const AgeLocationWrapper = styled.span`
  font-size: 2rem;
  margin-bottom: 52px;
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
  }
`;

const Summary = styled.div`
  padding: 50px;
  background-color: #f8f8f8;
  color: black;
  flex-grow: 1;
  @media screen and (max-width: 500px) {
    padding: 32px;
  }
`;

const SummaryHeader = styled.div`
  font-size: 1.5rem;
`;

const SummaryText = styled.div`
  font-size: 1.25rem;
  margin-top: 24px;
`;

export default function ProfilePage() {
  const { id } = useParams();
  const context = useContext(ProfilesContext);
  const profilesLoaded = areProfilesLoaded(context);

  useEffect(() => {
    if (!profilesLoaded) {
      loadProfiles(context.dispatch, context);
    }
  }, []); // eslint-disable-line

  if (!profilesLoaded) {
    // TODO replace with a skeleton screen
    return <ScreenMessage>Loading...</ScreenMessage>;
  }

  const loadError = getLoadProfilesError(context);
  if (loadError) {
    return <ErrorMessage>An error occured loading profiles</ErrorMessage>;
  }

  const { photoUrl, location, age, handle } = getProfileById(context, id);

  return (
    <Main>
      <TopBanner>
        <ImgWrapper src={photoUrl} alt="potential date"></ImgWrapper>
        <MainInfo>
          <NameWrapper>{handle}</NameWrapper>
          <AgeLocationWrapper>{location ? `${age} • ${location}` : age}</AgeLocationWrapper>
        </MainInfo>
      </TopBanner>
      <Summary>
        <SummaryHeader>Summary:</SummaryHeader>
        <SummaryText>Long walks on the beach ....</SummaryText>
      </Summary>
    </Main>
  );
}
