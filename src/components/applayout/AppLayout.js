import React from 'react';
import './AppLayout.css';
import { Layout, Menu, PageHeader } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import {AppstoreOutlined, ControlFilled } from '@ant-design/icons';

const { Content, Footer } = Layout;

class AppLayout extends React.Component {


  render() {

    return (
      <Layout style={{ minHeight: '100vh' }}>

        <PageHeader
        className="site-page-header"
        title="1up.Health Testing App"
        >
        </PageHeader>

          <Menu theme ="dark" mode="horizontal" defaultSelectedKeys={['requests']}
          style={{ height: '100%', borderRight: 10 }}
          >
          <Menu.Item key="requests">
            <Link to="/requests">
            <ControlFilled />
            <span>Requests</span>
            </Link>
            </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
            <AppstoreOutlined />
            <span>About</span>
            </Link>
          </Menu.Item>
          </Menu>
        <Layout className="site-layout">


          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: '4px 4px',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>1up.health Testing App</Footer>
      </Layout>
    );
  }
}

export default withRouter(AppLayout);