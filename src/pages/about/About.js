import React from 'react';
import styled from 'styled-components';

import { Typography } from 'antd';
// const { Title as BaseTitle, Text as BaseText } = Typography;

const Title = styled(Typography.Title)`
  font-size: 16px;
`;

const Text = styled(Typography.Text)`
  font-size: 16px;
`;

const StyledDiv = styled.div`
  min-height: 60vh;
`;

const About = () => {
  return (
    <StyledDiv>
        <Title>
        App for Testing 1upHealth Requests
        </Title>

        <Text>Not secure because it caches the access token in the browser, but does include this funky SVG square. </Text>        
        <br/>
        <br/>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">

        <path d="M 0 0 H 100 V 100 H 0 L 0 0" fill="transparent" stroke="black"/>
        <path d="M 0 0 V 100 H 100 V 0 H 0" fill="transparent" stroke="black"/>
        {/* <path d="M 10 10 C 28 56, 44 56, 50 50" stroke="black" fill="transparent"/>
        <path d="M 50 50 S 28 56, 44 56, 90 90" stroke="black" fill="transparent"/> */}
        <path d="M 10 10 h 80 v 80 h -80 Z" fill="transparent" stroke="black"/>
        <path d="M 20 20 h 60 v 60 h -60 Z" fill="transparent" stroke="black"/>
        <path d="M 30 30 h 40 v 40 h -40 Z" fill="transparent" stroke="black"/>
        <path d="M 40 40 h 20 v 20 h -20 Z" fill="transparent" stroke="black"/>
        <path d="M 50 50 h 1 v 1 h -1 Z" fill="transparent" stroke="black"/>
        
        </svg>
        <Text>
          <br/>
          <br/>
        Use strictly for internal testing of API endpoints.
        </Text>
    </StyledDiv>
  );
};

export default About;