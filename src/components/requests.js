/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import JSONViewer from 'react-json-viewer';
import styled from 'styled-components';
import { Link} from 'react-router-dom';

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

// use cors anywhere heroku app to avoid CORS issues in dev
const CORS_ANYWHERE_URL = `https://cors-anywhere.herokuapp.com/`;
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

    // Create a user in this context
    const createUser = async (value) => {
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`${CORS_ANYWHERE_URL}${ROOT_API_URL}/user-management/v1/user`, {
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
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        await axios.post(`${CORS_ANYWHERE_URL}${ROOT_API_URL}/user-management/v1/user/auth-code`, {
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

    // Get an auth token based on user access code
    const authToken = async (value) => {
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`${CORS_ANYWHERE_URL}${FHIR_API_URL}/oauth2/token`, {
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

    // Create a patient
   const createPatient = async (value) => {
   const config = {
       headers: {
         'Content-Type': 'application/json',
         "Authorization" : `Bearer ${token}`
       }
     };

   await axios.post(`${CORS_ANYWHERE_URL}${FHIR_API_URL}/dstu2/Patient`, {    
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

// Get a patient by name
const getPatient = (value, props) => { 
    axios({
      url: `${CORS_ANYWHERE_URL}${FHIR_API_URL}/dstu2/Patient/${value}`,
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

// Get everything about a patient from a patient ID
const getEverything = async (value) => {
    await axios.get(`${CORS_ANYWHERE_URL}${FHIR_API_URL}/dstu2/Patient/${value}/$everything`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then((response) => {
         const data = response.data;
         console.log(response);
         setEverythingData(data);
         console.log(everythingData);
    }
    )
 }
 
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
        <Link to={`${ROOT_API_URL}/connect/system/clinical/4707?client_id=${CLIENT_ID}&access_token=${token}`}>Connect Here</Link>
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