import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: ${props => props.top ? 'flex-start' : 'center'};
  background-color: #f0f0f0;
`;

export default Wrapper;