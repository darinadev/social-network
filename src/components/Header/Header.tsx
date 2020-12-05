import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Button, Col, Layout, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { getIsAuth, getLogin } from '../../selectors/auth-selectors';

const { Header } = Layout;

export const HeaderApp: React.FC = () => {

  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  return <Header className="header">
    <Row>
      <Col span={2}>
        <div className="logo">
          <img className={styles.logo} src={logo} alt=''/>
        </div>
      </Col>
      <Col span={19}></Col>
      {isAuth
        ? <>
          <Col span={1}>
            <Avatar size={35} alt={login || ''} style={{ backgroundColor: '#3d9b4f' }} icon={<UserOutlined />} />
          </Col>
          <Col span={2}>
            <Button onClick={logoutCallback}>Log out</Button>
          </Col>
        </>
        : <Col span={3}>
          <Button>
            <Link to='/login'>Login</Link>
          </Button>
        </Col>
      }
    </Row>
  </Header>
}