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
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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

    // create patient state
    const [createdData, createPatientData] = useState([]);

    //Patient state
    const [patient ,setPatient] = useState('');
    const [patientData, setPatientData] = useState([]);
    
    // Everything state
    const [everythingData, setEverythingData] = useState([]); 

    // Store the token in local storage. Never do this in prod
    useEffect(function persistToken() {
        localStorage.setItem('token', token);
    })

    const createUser = async (value) => {
        // Custom headers to avoid CORS issue
        // I am also using the MOESIF Origin & CORS changer Chrome Extension
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`https://cors-anywhere.herokuapp.com/https://api.1up.health/user-management/v1/user`, {
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

   // Get a new auth code for an existing user
    const authUser = async (value) => {
         // Custom headers to avoid CORS issue
         // I am also using the MOESIF Origin & CORS changer Chrome Extension
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        await axios.post(`https://cors-anywhere.herokuapp.com/https://api.1up.health/user-management/v1/user/auth-code`, {
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

       await axios.post(`https://cors-anywhere.herokuapp.com/https://api.1up.health/fhir/oauth2/token`, {
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

   const createPatient = async (value) => {
    // Custom headers to avoid CORS issue
    // I am also using the MOESIF Origin & CORS changer Chrome Extension
   const config = {
       headers: {
         'Content-Type': 'application/json',
         "Authorization" : `Bearer ${token}`
       }
     };

   await axios.post(`https://cors-anywhere.herokuapp.com/https://api.1up.health/fhir/dstu2/Patient`, {    
       "resourceType": "Patient",
       "id": `${value}`,
       "gender": "female"
   }, 
   config).then((response) => {
       const data = response.data;
       console.log(response);
       createPatientData(data);
       console.log(createdData);
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

const getPatient = (value, props) => { 
    axios({
      url: `https://cors-anywhere.herokuapp.com/https://api.1up.health/fhir/dstu2/Patient/${value}`,
      method: 'get',
      headers: {"Authorization" : `Bearer ${token}`}
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
    await axios.get(`https://cors-anywhere.herokuapp.com/https://api.1up.health/fhir/dstu2/Patient/${value}/$everything`, { headers: {"Authorization" : `Bearer ${token}`}})
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
        <Text><i>Start by creating a user to generate an auth code.</i></Text>
        <Search placeholder="Create a User" style={{ width: 1300, margin: '0 10px' }} onSearch={createUser} />
        <br/>
        <br/>
        <Card>
        <JSONViewer json={userData}/>
        </Card>
        <br/>
        <br/>
        </Card>
        
        <Card>
        <Title>
        Get New Auth Code for an Existing User
        </Title>
        <Text><i>Get a new auth code by username if the user already exists.</i></Text>
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
        <Text><i>Use the auth code generated above to generate a token that expires every hour.</i></Text>
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
        Create Patient
        </Title>
        <Text><i>A patient needs to exist in the context of this API token to be retrievable from subsequent endpoints. Please create a patient here.</i></Text>
        <Search placeholder="Get a patient" style={{ width: 1300, margin: '0 10px' }} onSearch={createPatient} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={createdData}/>
        </Card>
        </Card>

        <Card>
        <Title>
        Get Patient
        </Title>
        <Text><i>Return a patient that already exists in the context</i></Text>
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
        <Text><i>Return everything about a patient that already exists in the context. Use the patient ID, not name.</i></Text>
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
        <Link to={`https://api.1up.health/connect/system/clinical/4707?client_id=${CLIENT_ID}&access_token=${token}`}>Connect Here</Link>
        </Text>
        <br/>
        <br/>
        <iframe src="https://fhir-myrecord.cerner.com/dstu2/ec2458f2-1e24-41c8-b71b-0e701af7583d"></iframe>
        </Card>
        <br/>

        </div>
        )
}

export default Requests;