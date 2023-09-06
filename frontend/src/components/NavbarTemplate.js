import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { ProfileOutlined, MailOutlined, LogoutOutlined, CalendarOutlined, NotificationOutlined } from '@ant-design/icons';
import ClassRoom from './ClassRoom';
import Calender from './Calender'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../actions/userLogin'
import { deleteCookie } from '../services/cookie'
import './css/navbarTemplate.scss'

const { Header, Content, Footer } = Layout;

const NavbarTemplate = () => {
  const [currentComponent, setCurrentComponent] = useState({
    component: <ClassRoom />,
    key: 'classroom',
  })
  const value = useSelector(state => state.user)
  console.log(value);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.user.userStatus)
  const handleLogout = () => {
    console.log('logout claled');
    deleteCookie("userAuth")
    dispatch(userLogout())
    navigate("/login")
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const componentList = {
    classroom: <ClassRoom />,
    calender: <Calender />
  }
  const menuItem = [
    {
        label: 'Class Room',
        key: 'classroom',
        icon: <MailOutlined />
    },
    {
        label: 'Notifications',
        key: 'notifictaions',
        icon: <NotificationOutlined />,
    },
    {
        label: 'Calender',
        key: 'calender',
        icon: <CalendarOutlined />
    },
    {
        label: 'Profile',
        key: 'profile',
        icon: <ProfileOutlined />,
    },
    {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
    }
  ]
  const onClick = (e) => {
    console.log('click ', e);
    if(e.key == 'logout') {
        handleLogout()
    }
    setCurrentComponent({
        component: componentList[e.key],
        key: e.key
    })
  };
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          defaultSelectedKeys={['2']}
          items={menuItem}
        />
      </Header>
      <Content className="content-wrapper">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{currentComponent.key}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          {currentComponent.component}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default NavbarTemplate;