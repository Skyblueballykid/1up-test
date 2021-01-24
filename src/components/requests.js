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

// Hardcode for simplicity. Use env variables in production
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

    //Create user state
    const [user,setUser] = useState('');
    const [userData, setUserData] = useState([]);

    //Code state
    const[code, setUserCode] = useState('');
    const [codeData, setCodeData] = useState([]);

    //Token state
    const[token, setToken] =useState('');
    const[tokenData, setTokenData] = useState([]);

    //Patient state
    const [patient ,setPatient] = useState('');
    const [patientData, setPatientData] = useState([]);
    
    // Everything state
    const [everythingData, setEverythingData] = useState([]); 

    const createUser = async (value) => {
        // Custom headers to avoid CORS issue
        // I am also using the MOESIF Origin & CORS changer Chrome Extension
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`https://api.1up.health/user-management/v1/user`, {
           "app_user_id": value,
           "client_id": `${CLIENT_ID}`,
           "client_secret": `${CLIENT_SECRET}`
       }, 
       config).then((response) => {
           const data = response.data;
           console.log(response);
           setUser(data.app_user_id);
           setUserData(data);
           console.log(response);
           console.log(user);
           console.log(userData);
       });
   }

    const authUser = async (value) => {
         // Custom headers to avoid CORS issue
         // I am also using the MOESIF Origin & CORS changer Chrome Extension
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        await axios.post(`https://api.1up.health/user-management/v1/user/auth-code`, {
            "app_user_id": value,
            "client_id": `${CLIENT_ID}`,
            "client_secret": `${CLIENT_SECRET}`
        }, 
        config).then((response) => {
            const data = response.data;
            const code = response.data.code;
            setUserCode(code);
            setCodeData(data);
            console.log(response);
            console.log(code);
            console.log(codeData);

        });
    }

    const authToken = async (value) => {
        // Custom headers to avoid CORS issue
        // I am also using the MOESIF Origin & CORS changer Chrome Extension
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`https://api.1up.health/fhir/oauth2/token`, {
           "code": value,
           "grant_type" : "authorization_code",
           "client_id": `${CLIENT_ID}`,
           "client_secret": `${CLIENT_SECRET}`
       }, 
       config).then((response) => {
           const data = response.data;
           const token_string = response.data.access_token;
           setToken(token_string);
           setTokenData(data);
           console.log(response);
           console.log(token_string);
           console.log(tokenData);

       });
   }


//    const getPatient = async (value) => {
//    await axios.get(`https://api.1up.health/fhir/dstu2/Patient/${value}`, { headers: {"Authorization" : "Bearer f6ffc91305643707d6284d3e12476a527680039a"}})
//    .then((response) => {
//         // const data = response.data;
//         console.log(response);
//         // setPatient(data);
//         // setPatientData(data);
//         // console.log(response);
//         // console.log(patient);
//         // console.log(patientData);
//    }
//    )
// }

const getPatient = (value) => { 
    axios({
      url: `https://api.1up.health/fhir/dstu2/Patient/${value}`,
      method: 'get',
      headers: {"Authorization" : "Bearer f6ffc91305643707d6284d3e12476a527680039a"}
    })
      .then(response => {
        console.log(response);
        const data = response.data;
        setPatient(data);
        setPatientData(data);
        console.log(response);
        console.log(patient);
        console.log(patientData);
      });
  }


const getEverything = async (value) => {
    await axios.get(`https://api.1up.health/fhir/dstu2/Patient/${value}/everything`, { headers: {"Authorization" : "Bearer f6ffc91305643707d6284d3e12476a527680039a"}})
    .then((response) => {
         const data = response.data;
         console.log(response);
         setEverythingData(data);
         console.log(everythingData);
    }
    )
 }
 

    // const connectURL = `https://api.1up.health/connect/system/clinical/4707?client_id=dbb2e596333400b55c417c0a1ac5187aaccess_token=f1bdaf944c08d4df29f1c7119e60b69165b12b31` 

    return(
        <div>
        <Card>
        <Title>
        Create User
        </Title>
        <Search placeholder="Create a User" style={{ width: 1300, margin: '0 10px' }} onSearch={createUser} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={userData}/>
        </Card>
        </Card>
        
        <Card>
        <Title>
        Get New Auth Code for an Existing User
        </Title>
        <Search placeholder="Enter user name to get code" style={{ width: 1300, margin: '0 10px' }} onSearch={authUser} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={codeData}/>
        </Card>
        </Card>            

        <Card>
        <Title>
        Get Token from Auth Code
        </Title>
        <Search placeholder="Enter code to get token" style={{ width: 1300, margin: '0 10px' }} onSearch={authToken} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={tokenData}/>
        </Card>
        </Card>

        <Card>
        <Title>
        Get Patient
        </Title>
        <Search placeholder="Get a patient" style={{ width: 1300, margin: '0 10px' }} onSearch={getPatient} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={patientData}/>
        </Card>
        </Card>

        <Card>
        <Title>
        Get Everything About a Patient
        </Title>
        <Search placeholder="Query Everything about a Patient" style={{ width: 1300, margin: '0 10px' }} onSearch={getEverything} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={everythingData}/>
        </Card>
        </Card>

        <Card>
        <Title>
        Connect to Provider
        </Title>
        <Text>
        <a href="https://api.1up.health/connect/system/clinical/4707?client_id=dbb2e596333400b55c417c0a1ac5187a&access_token=f1bdaf944c08d4df29f1c7119e60b69165b12b31">
        Connect Here
        </a>
        </Text>
        </Card>
        <br/>

        </div>
        )
}

export default Requests;