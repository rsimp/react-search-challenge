import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Switch from 'react-switch';

import { getIsAutoFetchEnabled, getPollInterval, getCountdownText } from 'store/profiles/selectors';

import { autoFetchChanged } from './actions';
import { pollProfilesThunk } from './async';

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
  const dispatch = useDispatch();
  const abortController = useRef(new AbortController());

  const isAutoFetchEnabled = useSelector(getIsAutoFetchEnabled);
  const pollInterval = useSelector(getPollInterval);
  const countdownText = useSelector(getCountdownText);

  // this seems much easier with sagas, much cleaner and safer too
  useEffect(() => {
    if (isAutoFetchEnabled) {
      abortController.current = new AbortController();
      dispatch(pollProfilesThunk(abortController.current, Date.now() + pollInterval));
    }
    return () => {
      abortController.current.abort();
    };
  }, [dispatch, isAutoFetchEnabled, pollInterval]);

  return (
    <WidgetContainer>
      <Label>
        <span>Auto-fetch</span>
        <Switch
          disabled={props.disabled}
          onChange={(checked) => dispatch(autoFetchChanged(checked))}
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
