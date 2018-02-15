/* eslint react/prop-types: 0 */
import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'native-base';

import Colors from '../constants/Colors';
import CONSTANTS from '../constants';
import TodosScreen from './TodosScreen';

// todos data to be shared between all screens
const data = [];

const commonNavigationOptions = ({ navigation }) => ({
  header: null,
  title: navigation.state.routeName,
});

const routeOptions = {
  screen: TodosScreen,
  navigationOptions: commonNavigationOptions,
};

const TabNav = TabNavigator(
  {
    [CONSTANTS.ALL]: routeOptions,
    [CONSTANTS.ACTIVE]: routeOptions,
    [CONSTANTS.COMPLETED]: routeOptions,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case CONSTANTS.ALL:
            iconName = 'ios-list';
            break;
          case CONSTANTS.ACTIVE:
            iconName = 'ios-list-box-outline';
            break;
          case CONSTANTS.COMPLETED:
            iconName = 'ios-checkmark-circle-outline';
        }
        return (
          <Icon
            name={iconName}
            size={28}
            style={{
              marginBottom: -3, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,
            }}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);

const TabNavExport = () => <TabNav screenProps={{ todos: { data } }} />;

export default TabNavExport;
