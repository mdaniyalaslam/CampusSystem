import React, { Component } from 'react';
import Routers from './Route';
import { Provider } from 'react-redux';
import store from './store';
// import { Divider } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Background from './img/material.jpg'

// const img = {
//     backgroundSize: '100%',
//     height: 570,
//     backgroundImage : `url(${Background})`,
//     // backgroundRepeat: "noRepeat",
//     // backgroundSize: "auto"
// }

class App extends Component {
  render() {
    return (
      // <div style={img}>
      <MuiThemeProvider>
        <Provider store={store}>
          <Routers />
        </Provider>
      </MuiThemeProvider>

    );
  }
}

export default App;
