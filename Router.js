import React, { Component } from 'react'
import {
  View,
  StatusBar,
} from 'react-native'

import { Scene, Router } from 'react-native-router-flux';

import Login from './src/AuthContainer/Login';
import SignUp from './src/AuthContainer/SignUp';
import Dashboard from './src/MainContainer/Dashboard'
import NewRegister from './src/MainContainer/NewRegister';
import Profile from './src/MainContainer/Profile';


class RouterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Router>
          <Scene key='app'>
            <Scene key='auth' initial hideNavBar>
              <Scene key='login'
                component={Login}
                initial />
              <Scene key='signUp'
                component={SignUp}
                hideNavBar={false}
                navigationBarStyle={styles.navBar}
                title='Cadastro'
                titleStyle={styles.titleStyle}
                leftButtonIconStyle={styles.backButton}
                headerTintColor="#fff" />
              <Scene key='dashboard'
                component={Dashboard}
              />
              <Scene key='profile'
                component={Profile}
              />
              <Scene key='newRegister'
                component={NewRegister}
                hideNavBar={false}
                navigationBarStyle={styles.navBar}
                title='Registro'
                titleStyle={styles.titleStyle}
                leftButtonIconStyle={styles.backButton}
                headerTintColor="#fff"
              />
            </Scene>
          </Scene>
        </Router>
      </View>
    )
  };
}

const styles = {
  container: {
    flex: 1
  },
  sceneStyle: {
    backgroundColor: '#F5F6F7'
  },
  navBar: {
    elevation: 10,
    borderBottomWidth: 0,
    backgroundColor: '#6896ff',
    shadowColor: '#1538b9',
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  titleStyle: {
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '500',
    textAlign: 'right',
    // marginLeft: -30,
  },
  backButton: {
    color: '#fff',
    tintColor: '#fff'
  }
}

export default RouterComponent
