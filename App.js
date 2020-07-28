import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import EventList from './EventList';
import EventForm from './EventForm';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Animated: `useNativeDriver` was not specified',
]);

const AppNavigator = createStackNavigator(
  {
    list: {
      screen: EventList, 
      navigationOptions: {
          title: "CountDown",
      },
    },
    form: {
      screen: EventForm, 
      navigationOptions: {
          headerBackTitle: " ",
          headerTitleStyle: {color:'black'},
          headerTintColor: '#f2d705',
        },
    },
  },
  {
    initialRouteName: 'list',
  },
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
