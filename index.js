import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from "buffer";

global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
