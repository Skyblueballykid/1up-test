/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import { Collapse, Result, Cascader, Popover, Card, Col, Row, Input, Button, Radio } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import JSONViewer from 'react-json-viewer';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

const { Search } = Input;


const CLIENT_ID = `dbb2e596333400b55c417c0a1ac5187a`;
const CLIENT_SECRET = `e52c028bd69b7dcfa3587e343d87f13f`;
const ROOT_API_URL = `https://api.1up.health`;
const FHIR_API_URL = `https://api.1up.health/fhir`;


function getRequest(value) {
    axios.get(value, {timeout: 10000}
    )
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}


// adapted from oneup.js file in demo app to use axios 
function getToken(code, callback) {
    let postUrl = `${ROOT_API_URL}/fhir/ouath2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;
    axios.post(postUrl)
}


// const response = [
//     {label: 'Authorization', value: 'Authorization'},
//     {label: 'Content Type', value: 'Application/JSON'},
//     {label: 'Connection', value: 'Connection'},
//     {label: 'Transfer-Encoding', value: 'Transfer-Encoding'},
//     {label: 'Keep-Alive', value: 'Keep-Alive'}
// ]
const onChange = () => console.log('cool');

const Requests = () => {

    const[code, setUserCode] = useState('');
    const [userData, setUserData] = useState([]);


    const createUser = async (value) => {
         // Custom headers to avoid CORS issue
         // I am also using the MOESIF Origin & CORS changer Chrome Extension
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        axios.post(`https://api.1up.health/user-management/v1/user/auth-code`, {
            "app_user_id": value,
            "client_id": "dbb2e596333400b55c417c0a1ac5187a",
            "client_secret": "e52c028bd69b7dcfa3587e343d87f13f"
        }, 
        config).then((response) => {
            const data = response.data;
            const code = response.data.code;
            setUserCode(code);
            setUserData(data);
            console.log(response);
            console.log(code);
            console.log(userData);

        });
    }

    const connectURL = `https://api.1up.health/connect/system/clinical/4707?client_id=dbb2e596333400b55c417c0a1ac5187aaccess_token=f1bdaf944c08d4df29f1c7119e60b69165b12b31` 

    return(
        <div>
        <Card>
        <Title>
        Create User
        </Title>
        <Search placeholder="Enter new user name" style={{ width: 800, margin: '0 10px' }} onSearch={createUser} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={userData}/>
        </Card>
        </Card>
        <Card>
        <Title>
        Connect
        </Title>
        <Text>
        <a href="https://api.1up.health/connect/system/clinical/4707?client_id=dbb2e596333400b55c417c0a1ac5187a&access_token=f1bdaf944c08d4df29f1c7119e60b69165b12b31">
        Connect Here
        </a>
        </Text>
        </Card>
        <Card>
        <Title>
        Everything Query
        </Title>            
        <Text>
        curl -X GET 'https://api.1up.health/fhir/{`r4`}/Patient/{`1d5e078b47ba`}/$everything' \
        -H "Authorization: Bearer dad180fae9bec712cc116ea64627561c793586e3"
        </Text>
        {/* <JSONViewer json={response}/> */}
        </Card>
        </div>
        )
}

export default Requests;