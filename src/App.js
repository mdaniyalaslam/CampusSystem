import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
// import { Divider } from 'material-ui';

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
      <div>

      <Provider store={store}>
        <Routers />
      </Provider>
      </div>
    );
  }
}

export default App;
