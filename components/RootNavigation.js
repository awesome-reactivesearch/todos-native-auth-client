import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container } from 'native-base';
import { ReactiveBase } from '@appbaseio/reactivesearch-native';

import CONFIG from '../constants/Config';
import COLORS from '../constants/Colors';
import MainTabNavigator from './MainTabNavigator';

const RootStackNavigator = StackNavigator({
  Main: {
    screen: MainTabNavigator,
  },
});

export default class RootNavigator extends React.Component {
  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    return (
      <ReactiveBase app={CONFIG.app} credentials={CONFIG.credentials} type={CONFIG.type}>
        <Container>
          <RootStackNavigator />
        </Container>
      </ReactiveBase>
    );
  };
}
