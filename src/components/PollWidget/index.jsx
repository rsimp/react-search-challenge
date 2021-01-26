import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import Switch from 'react-switch';

import { ProfilesContext } from 'context/ProfilesContext';
import { getAutoFetchProfiles, getPollInterval, getCountdownText } from 'context/selectors';

import { setAutoFetch } from './actions';
import { pollProfiles } from './async';

const WidgetContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.333rem;
`;

const Label = styled.label`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 1.333rem;
  & > * {
    margin-right: 0.5rem;
    user-select: none;
  }
`;

export default function PollWidget(props) {
  const context = useContext(ProfilesContext);
  const abortController = useRef(new AbortController());

  // hack to get around some linting rules, what I really need is something like
  // getState, I think at this point it just makes more sense to connect in redux
  // and use thunks (or sagas)
  const contextRef = useRef();
  contextRef.current = context;

  const isAutoFetchEnabled = getAutoFetchProfiles(context);
  const pollInterval = getPollInterval(context);
  const countdownText = getCountdownText(context);

  useEffect(() => {
    return () => {
      abortController.current.abort();
    };
  }, []);

  // this seems much easier with sagas, much cleaner and safer too
  useEffect(() => {
    abortController.current.abort();
    if (isAutoFetchEnabled) {
      abortController.current = new AbortController();
      pollProfiles(contextRef.current, abortController.current, pollInterval);
    }
  }, [isAutoFetchEnabled, pollInterval]);

  return (
    <WidgetContainer>
      <Label>
        <span>Auto-fetch</span>
        <Switch
          disabled={props.disabled}
          onChange={(checked) => context.dispatch(setAutoFetch(checked))}
          checked={isAutoFetchEnabled}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={48}
          handleDiameter={28}
          onColor="#899bf5"
          onHandleColor="#1234e6"
          offHandleColor="#CCCCCC"
        />
      </Label>
      <span>{countdownText}</span>
    </WidgetContainer>
  );
}
