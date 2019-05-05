import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from "react-navigation"

import Home from '../page/Home'

const StackNavigator = createStackNavigator({ Home });

const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component {
  render() {
    return (
        <AppContainer />
    );
  }
}


