import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import { initializeApp, actions as appActions } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader';
import { compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/store';
import { Provider } from 'react-redux';
import Error from './components/common/Error/Error'
import { Layout, Menu } from 'antd';
import { HeaderApp } from './components/Header/Header';

const { Content, Footer, Sider } = Layout;

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
  setIsError: (isError: boolean) => void
}
type PropsType = {
  location: any
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType & PropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    this.props.setIsError(true);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render() {
    const { pathname } = this.props.location;
    let page = pathname === '/profile' ? ['1'] : pathname === '/dialogs' ? ['2'] : pathname === '/users' ? ['3'] : [''];
    if (!this.props.initialized) {
      return <Preloader />
    }
    return <Layout>
      <HeaderApp />
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu mode="inline"
              defaultSelectedKeys={page}
              style={{ height: '100%' }}
            >
              <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dialogs">Dialogs</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <React.Suspense fallback={<Preloader />}>
              <Switch>
                <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
                <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                <Route exact path='/dialogs' render={() => <DialogsPage />} />
                <Route path='/users' render={() => <UsersPage />} />
                <Route path='/login' render={() => <Login />} />
                <Route path='*' render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </React.Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Social Network ©2020 Created by DragonThemes</Footer>
      {this.props.isError && <Error />}
    </Layout>
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  isError: state.app.isError
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp, setIsError: appActions.setIsError }))(App);

const MainApp: React.FC = () => {
  return <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
}

export default MainApp;