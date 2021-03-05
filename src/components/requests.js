/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import axios from 'axios';
import JSONViewer from 'react-json-viewer';
import styled from 'styled-components';
import ReactJson from 'react-json-view';

import { Typography } from 'antd';

const Title = styled(Typography.Title)`
  font-size: 16px;
`;

const Text = styled(Typography.Text)`
  font-size: 16px;
`;

const { Search } = Input;

const REACT_APP_CLIENT_ID = process.env.REACT_APP_ONEUP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_ONEUP_CLIENT_SECRET;

// use cors anywhere heroku app to avoid CORS issues in Dev. Might be slow
// https://cors-anywhere.herokuapp.com/
const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com';
const ROOT_API_URL = `/cors-proxy/https://api.1up.health`;
const FHIR_API_URL = `/cors-proxy/https://api.1up.health/fhir`;
// const PROXY_TOKEN_URL = `http://localhost:8080/api/token/`;


const Requests = () => {

    //Create user state
    const [user,setUser] = useState('');
    const [userData, setUserData] = useState([]);

    //Code state
    // const[code, setUserCode] = useState('');
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

    // EHR data
    const [patientEHRData, setPatientEHRData] = useState([]);
    // const [officialName, setOfficialName] = useState('');
    // const [ID, setID] = useState('');
    // const [patientBirth, setPatientBirth] = useState('');
    // const [patientGender, setPatientGender] = useState('');
    // const [patientAddress, setPatientAddress] = useState([]);
    // const [patientCareProvider, setPatientCareProvider] = useState([]);
    // const [patientCommunication, setPatientCommunication] = useState([]);
    // const [patientContactName, setPatientContact1] = useState([]);
    // const [patientContactAddress, setPatientContact2] = useState([]);
    // const [patientContactGender, setPatientContact3] = useState([]);
    // const [patientContactDate, setPatientContact4] = useState([]);  
    // const [patientContactRelation, setPatientContact5] = useState([]);
    // const [patientContactTelecom, setPatientContact6] = useState([]);    
    // const [patientExtension1, setPatientExtension1] = useState([]);
    // const [patientExtension2, setPatientExtension2] = useState([]);
    // const [patientName, setPatientName] = useState([]);
    // const [patientTelecom, setPatientTelecom] = useState([]);
    // const [patientIdentifier, setPatientIdentifier] = useState([]);
    // const [patientMaritalStatus, setPatientMaritalStatus] =useState([]);

    // Set provider ID for use in Connect API 
    const [providerID, setProviderID] = useState('');

    useEffect(() => {
      const parsedToken = String(localStorage.getItem("token") || 0)
      setToken(parsedToken)
    }, [])

    // Store the token in local storage. Never do this in prod
    useEffect(function persistToken() {
        localStorage.setItem('token', token);
    }, [token])

    // Create a user in this context
    const createUser = async (value) => {
       const config = {
           headers: {
             'Content-Type': 'application/json'
           }
         };

       await axios.post(`${CORS_ANYWHERE_URL}${ROOT_API_URL}/user-management/v1/user`, {
           "app_user_id": value,
           "client_id": `${REACT_APP_CLIENT_ID}`,
           "client_secret": `${REACT_APP_CLIENT_SECRET}`
       }, 
       config).then((response) => {
           const data = response.data;
           console.log(response);
           setUser(data.app_user_id);
           setUserData(data);
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
            "client_id": `${REACT_APP_CLIENT_ID}`,
            "client_secret": `${REACT_APP_CLIENT_SECRET}`
        }, 
        config).then((response) => {
            const data = response.data;
            const code = response.data.code;
            // setUserCode(code);
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
           "client_id": `${REACT_APP_CLIENT_ID}`,
           "client_secret": `${REACT_APP_CLIENT_SECRET}`
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

   // Get a token from the proxy server
  //  const getProxyToken = async (value) => {
  //    const config = {
  //      headers: {
  //        'Content-Type': 'application/json'
  //      }
  //    };

  //    await axios.get(`${PROXY_TOKEN_URL}${value}`)
  //    .then(response => {
  //      console.log(response)
  //      const data = response.data;
  //      const token_string = response.data;
  //      setToken(token_string);
  //      setTokenData(data);
  //    })
  //  }

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

 // Get patient from EHR systems
 const getPatientEHRData = (value, props) => { 
  axios({
    url: `${CORS_ANYWHERE_URL}${FHIR_API_URL}/dstu2/Patient`,
    method: 'get',
    headers: {"Authorization" : `Bearer ${token}`}
  })
    .then(response => {
      console.log(response);
      const data = response.data;
      // const address = data.entry[0].resource.address[0];
      // const name = data.entry[0].resource.name;
      // const officialName = data.entry[0].resource.name[0];
      // const id = data.entry[0].resource.id;
      // const extension1 = data.entry[0].resource.extension[0].extension;
      // const extension2 = data.entry[0].resource.extension[1].extension;
      // const gender = data.entry[0].resource.gender;
      // const maritalStatus = data.entry[0].resource.maritalStatus;
      // const telecom = data.entry[0].resource.telecom;
      // const identifier = data.entry[0].resource.identifier;
      // const birth = data.entry[0].resource.birthDate;
      // const contactName = data.entry[0].resource.contact[0].name;
      // const contactAddress = data.entry[0].resource.contact[0].address;
      // const contactGender = data.entry[0].resource.contact[0].gender;
      // const contactPeriod = data.entry[0].resource.contact[0].period;
      // const contactRelation = data.entry[0].resource.contact[0].relationship;
      // const contactTelecom = data.entry[0].resource.contact[0].telecom; 
      // const careProvider = data.entry[0].resource.careProvider;
      // const communication = data.entry[0].resource.communication[0];
      setPatientEHRData(data);
      // setPatientName(name);
      // setOfficialName(officialName);
      // setPatientTelecom(telecom);
      // setPatientContact1(contactName);
      // setPatientContact2(contactAddress);
      // setPatientContact3(contactGender);
      // setPatientContact4(contactPeriod);
      // setPatientContact5(contactRelation);
      // setPatientContact6(contactTelecom);
      // setPatientAddress(address);
      // setPatientIdentifier(identifier);
      // setPatientBirth(birth);
      // setID(id);
      // setPatientGender(gender);
      // setPatientMaritalStatus(maritalStatus);
      // setPatientExtension1(extension1);
      // setPatientExtension2(extension2);
      // setPatientCareProvider(careProvider);
      // setPatientCommunication(communication);
      // console.log(response);
      // console.log(patientContactName);
    });
}

 
    return(
        <div>
        <Card>
        <Title>
        Create User
        </Title>
        <Text><i>Start by creating a user to generate an auth code.</i></Text>
        <br/>
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
        <br/>
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
        <br/>
        <Search placeholder="Enter code to get token" style={{ width: 1300, margin: '0 10px' }} onSearch={authToken} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={tokenData}/>
        </Card>
        </Card>

        {/* Uncomment this code if you set up the Proxy Server */}

        {/* <Card>
        <Title>
        Get Token with Auth Code from Proxy Server
        </Title>
        <Text><i>Use the auth code generated above to generate a token that expires every hour.</i></Text>
        <br/>
        <Search placeholder="Enter code to get token" style={{ width: 1300, margin: '0 10px' }} onSearch={getProxyToken} />
        <br/>
        <br/>
        <br/>
        <Card>
        <JSONViewer json={tokenData}/>
        </Card>
        </Card> */}

        <Card>
        <Title>
        Create Patient
        </Title>
        <Text><i>A patient needs to exist in the context of this API token to be retrievable from subsequent endpoints. Please create a patient here.</i></Text>
        <br/>
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
        <br/>
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
        <br/>
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
        {/* <Button
        onClick={saveToken}
        > */}
        <Search placeholder="Enter a Provider ID...Be sure to click submit to input the provider ID you entered --->" style={{ width: 1300, margin: '0 10px' }} onSearch={setProviderID}/>
        <br/> 
        <br/>
        <Text>
        <a href={`${ROOT_API_URL}/connect/system/clinical/${providerID}?client_id=${REACT_APP_CLIENT_ID}&access_token=${token}`}>Connect Here</a>
        </Text>
        {/* </Button> */}
        <br/>
        <br/>
        <Button
        onClick={getPatientEHRData}
        >
        Show Patient Data
        </Button>
        <br/>
        <Card>
        {/* Remove this because it is a bit messy */}

        {/* <JSONViewer json={{officialName}}/>
        <br/>
        <JSONViewer json={{ID}}/>
        <br/>
        <JSONViewer json={{patientBirth}}/>
        <br/>
        <JSONViewer json={{patientGender}}/>
        <br/>
        <JSONViewer json={{patientAddress}}/>
        <br/>
        <JSONViewer json={{patientCareProvider}}/>
        <br/>
        <JSONViewer json={{patientCommunication}}/>
        <br/>
        <JSONViewer json={{patientMaritalStatus}}/>
        <br/>
        <JSONViewer json={{patientName}}/>
        <br/>
        <JSONViewer json={{patientTelecom}}/>
        <br/>
        <JSONViewer json={{patientContactName}}/>
        <JSONViewer json={{patientContactAddress}}/>
        <JSONViewer json={{patientContactGender}}/>
        <JSONViewer json={{patientContactDate}}/>
        <JSONViewer json={{patientContactRelation}}/>
        <JSONViewer json={{patientContactTelecom}}/>  
        <br/>
        <JSONViewer json={{patientExtension1}}/>
        <br/>
        <JSONViewer json={{patientExtension2}}/>
        <br/>
        <JSONViewer json={{patientIdentifier}}/>
        <br/> */}
        <ReactJson src={patientEHRData}/>
        </Card>
        <br/>
        <br/>
        </Card>
        <br/>
        </div>
        )
}

export default Requests;