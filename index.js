import 'react-native-gesture-handler';

import App from './App';
import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
