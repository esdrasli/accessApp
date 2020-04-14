import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Container, Header, View, Button, Fab, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import PeopleList from './FlatList'
import ProfileConf from './Profile';


const FirstRoute = () => (
  // <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  <PeopleList />
);
const SecondRoute = () => (
  // <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  <ProfileConf />
);

var { height, width } = Dimensions.get('window');

type Props = {};
export default class Dashboard extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      PeoplesData: [],
      active: false,
      index: 0,
      routes: [
        { key: 'first', icon: 'list' },
        { key: 'second', icon: "person-outline" },
      ],
    };
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          {!this.state.index && (
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: '#5067FF', marginBottom: 50, zIndex: 999 }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}
            >
              <Icon name={this.state.active ? 'close' : 'add'} />
              <Button style={{ backgroundColor: '#3B5998', marginBottom: 50, zIndex: 999 }} onPress={() => this.goToNewRegister()}>
                <Icon name="person-add" type='Ionicons' />
              </Button>
              <Button style={{ backgroundColor: '#3B5998', marginBottom: 50, zIndex: 999 }}>
                <Icon name="time" type='Ionicons' />
              </Button>
            </Fab>
          )}

          <TabView
            navigationState={this.state}
            renderPager={this._renderPager}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
            useNativeDriver
            tabBarPosition='bottom'
            style={styles.scene}
          />
        </View>
      </Container>
    );
  }

  goToNewRegister() {
    console.log('Foi')
    Actions.newRegister();
    this.setState({ active: !this.state.active })
  }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  _renderTabBar = props => (
    <TabBar
      {...props}
      renderIndicator={this._renderIndicator}
      renderIcon={this._renderIcon}
      tabStyle={styles.tabbar}
      labelStyle={styles.tabbar}
    />
  );

  _renderIcon = ({ route }) => (
    <Icon
      name={route.icon}
      size={24}
      style={styles.icon}
      type='MaterialIcons'
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent: 'space-between',
    // justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff',
    // margin: -20, 
    height: height,
    width: width
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  scene: {
    flex: 1,
    // position: 'relative',
    // zIndex: -1
    // justifyContent: 'space-between',    
  },
  icon: {
    color: 'white',
    // flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'flex-end',
    // marginBottom: 100,
    // position: 'absolute'
    padding: -20
  },
  tabbar: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // textAlign: 'right',
    // height: height * 0.1,
    fontSize: 10,
    // position: 'relative', 
    // alignSelf: 'stretch', 
    marginTop: -3
  },
  backButton: {
    width: 30,
    height: 30,
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 200,
    padding: 4,
    marginTop: 45,
    // marginLeft: 50,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 24,
    alignItems: 'flex-start',
    textAlign: 'right',
    color: "white",
    marginTop: 55,
    // marginBottom: 30,
    marginRight: 110
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#23541b",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: width * 0.05
  }
});
