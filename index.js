import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from "buffer";

global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { DEV_MODE } from './src/constants';

if (DEV_MODE) {
    XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
        GLOBAL.originalXMLHttpRequest :
        GLOBAL.XMLHttpRequest;

    // fetch logger
    global._fetch = fetch;
    global.fetch = function (uri, options, ...args) {
        return global._fetch(uri, options, ...args).then((response) => {
            console.log('Fetch', { request: { uri, options, ...args }, response });
            return response;
        });
    };
}

AppRegistry.registerComponent(appName, () => App);
