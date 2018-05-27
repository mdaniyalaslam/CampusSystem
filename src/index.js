import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

ReactDOM.render(
    <MuiThemeProvider>
        <div>
            <AppBar
                title="Campus Recruitment System"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <App />
        </div>
    </MuiThemeProvider>
    , document.getElementById('root')
);
registerServiceWorker();
