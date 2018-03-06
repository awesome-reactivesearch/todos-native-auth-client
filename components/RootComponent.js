import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Container } from 'native-base';
import { ReactiveBase } from '@appbaseio/reactivesearch-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'divyanshu.auth0.com', clientId: '6ZR8Jgj6Gzy1onJhrO0egEbfudIBVZNP' });

import CONFIG from '../constants/Config';
import COLORS from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';

export default class RootComponent extends React.Component {
  state = {
    accessToken: null,
    avatar: null,
    name: null
  }

  handleLogin = () => {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: 'https://todosnative'})
      .then((credentials) => {
        auth0
          .auth
          .userInfo({token: credentials.accessToken})
          .then((user) => {
            this.setState({
              accessToken: credentials.accessToken,
              avatar: user.picture,
              name: user.nickname
            });
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error));
  }

  handleLogout = () => {
    this.setState({
      accessToken: null,
      avatar: null,
      name: null
    });
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    return (
      <ReactiveBase app={CONFIG.app} credentials={CONFIG.credentials} type={CONFIG.type}>
        <Container>
          <MainTabNavigator
            screenProps={{
              accessToken: this.state.accessToken,
              avatar: this.state.avatar,
              name: this.state.name,
              handleLogin: this.handleLogin,
              handleLogout: this.handleLogout
            }}
          />
        </Container>
      </ReactiveBase>
    );
  };
}
