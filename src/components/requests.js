/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import { Collapse, Result, Cascader, Popover, Card, Col, Row, Input, Button, Radio } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import JSONViewer from 'react-json-viewer';
import { getRequest } from './requests/Get';

const { Search } = Input;

const { Panel } = Collapse;

// https://ant.design/components/radio/
const options = [
    {label: 'GET', value: 'GET'},
    {label: 'POST', value: 'POST'},
    {label: 'PUT', value: 'PUT'},
    {label: 'DELETE', value: 'DELETE'},
]


const headers = [
    {label: 'Authorization', value: 'Authorization'},
    {label: 'Content Type', value: 'Application/JSON'},
    {label: 'Connection', value: 'Connection'},
    {label: 'Transfer-Encoding', value: 'Transfer-Encoding'},
    {label: 'Keep-Alive', value: 'Keep-Alive'}

]

const { REACT_APP_API } = process.env;


const response = [
    {label: 'Authorization', value: 'Authorization'},
    {label: 'Content Type', value: 'Application/JSON'},
    {label: 'Connection', value: 'Connection'},
    {label: 'Transfer-Encoding', value: 'Transfer-Encoding'},
    {label: 'Keep-Alive', value: 'Keep-Alive'}
]

const onChange = () => console.log('cool');

const Requests = () => {
    return(
        <div>
        <Card>
        <h1>Enter the HTTP request URL here:</h1>
        <Card>
        <MinusCircleOutlined />
        <Search placeholder="input API url" style={{ width: 1350, margin: '0 10px' }} onSearch={getRequest} /><Button type="primary" style={{ margin: '0 10px' }}>Go</Button>
        <PlusCircleOutlined />
        </Card>
        <Radio.Group options={options}></Radio.Group>
        <Cascader options={headers} onChange={onChange} placeholder="Headers"></Cascader>
        <Input style={{ margin: '0 10px', width: 800}} placeholder="HTTP header value"></Input>
        <Collapse ghost>
        <Panel>
        <Card><JSONViewer json={response}/></Card>
        </Panel>
        </Collapse>
        <br/>
        <br/>
        </Card>
        </div>
        )
}

export default Requests;