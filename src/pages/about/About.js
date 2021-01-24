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
        Thomas J Kalnik
        </Title>
        <Text>kalnik.thomas@gmail.com</Text>
        <br/>
        <Text>845.807.3052</Text>
    </StyledDiv>
  );
};

export default About;