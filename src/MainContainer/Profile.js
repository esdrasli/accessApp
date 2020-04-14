import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import firebase from "firebase"
import _ from "lodash"
import { List, ListItem, SearchBar, Avatar, Divider } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Container, Item, Button, Icon } from 'native-base';

var { height, width } = Dimensions.get('window');

this.arrayholder = [];

type Props = {};
export default class ProfileConf extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            deviceWidth: width,
            deviceHeight: height,
            userData: {},
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function (user) {
            this.setState({ userUid: user.uid });
            if (user) {//Se é diferente de null, se é true, se é diferente de vazio, se é diferente de undefind
                firebase.database().ref("Users/")
                    // .orderByChild("uid")
                    // .equalTo(user.uid)
                    .once("value")
                    .then((snapshot) => {
                        this.setState({ userData: snapshot.val()[user.uid] })
                        console.log('Teste')
                        console.log(userData)
                    })
            }
        }.bind(this));
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewTitle}>
                    <Text style={styles.titleText}>Perfil</Text>
                </View>
                <Avatar
                    large
                    rounded
                    // source={(this.state.avatarSource)}
                    // activeOpacity={1}
                    icon={{ name: 'user', type: 'font-awesome' }}
                    containerStyle={{ marginTop: -30, backgroundColor: 'gray' }}
                />
                <View style={{ flex: 1, alignItems: 'flex-start', width: width * 0.9, justifyContent: 'flex-start', flexWrap: 'nowrap', marginTop: 10 }}>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.welcome}>Nome: </Text>
                        <Text style={styles.instructions}>{this.state.userData.nome ? this.state.userData.nome : 'Não informado'}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', width: width * 0.90, opacity: 0.1 }} />
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.instructions}>Telefone: </Text>
                        <Text style={styles.welcome}>{this.state.userData.telefone ? this.state.userData.telefone : 'Não informado'}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', width: width * 0.90, opacity: 0.1 }} />
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.instructions}>E-mail: </Text>
                        <Text style={styles.welcome}>{this.state.userData.email ? this.state.userData.email : 'Não informado'}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', width: width * 0.90, opacity: 0.1 }} />
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.instructions}>Cidade: </Text>
                        <Text style={styles.welcome}>{this.state.userData.cidade ? this.state.userData.cidade : 'Não informado'}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', width: width * 0.90, opacity: 0.1 }} />
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Text style={styles.instructions}>Idade: </Text>
                        <Text style={styles.welcome}>{this.state.userData.idade ? this.state.userData.idade : 'Não informado'}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'blue', width: width * 0.90, opacity: 0.1 }} />
                </View>
                <Button full info iconLeft style={{justifyContent: 'flex-start', alignItems:'center'}}>
                    <Icon name='create' color='white'/>
                    <Text style={{color: 'white', tint: 'white'}}>     Editar Perfil</Text>
                </Button>
                <Button full info iconLeft style={{justifyContent: 'flex-start', alignItems:'center'}}>
                    <Icon name='help' color='white'/>
                    <Text style={{color: 'white', tint: 'white'}}>       Sobre Nós</Text>
                </Button>
                <Button full info iconLeft style={{justifyContent: 'flex-start', alignItems:'center'}}>
                    <Icon name='log-out' color='white'/>
                    <Text style={{alignItems:'flex-start', color: 'white', tint: 'white', alignContent: 'flex-start'}}>     LogOut</Text>
                </Button>
                
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: -3,
        alignContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        // flex: 1,
        // backgroundColor: 'transparent',
        // borderColor: 'transparent',
        // width: width,
        // height: height * 0.80,
        justifyContent: 'center',
        // margin: -4
        // marginLeft: 5,
        // marginBottom: -5,
        // paddingBottom: -5
        // alignItems: 'center',
        // textAlign: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'right',
        justifyContent: 'flex-start'
        // margin: 10,
    },
    instructions: {
        textAlign: 'right',
        color: '#333333',
        // marginBottom: 5,
        // marginLeft: 50,
        justifyContent: 'flex-start',
        // alignItems: 'center'
    },
    loginButton: {
        backgroundColor: "#23541b",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: width * 0.8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: width * 0.05
    },
    rowView: {
        flex: 1,
        // flexDirection: "row",
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // // textAlign: 'right',
        // width: width,
        // maxWidth: width * 0.98,
        // margin: 3,
        height: height * 0.1,
        // marginTop: -0,
        // // position: 'relative',
        // // marginBottom: -15,
        // // paddingBottom: -20
        // borderBottomWidth: 1,
        // borderLeftColor: 'gray',
    },
    icone: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        // width: width,
        // marginTop: -20,
        marginLeft: 5,
        // position: 'relative',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    },
    viewTitle:{
        backgroundColor: '#6896ff',
        height: height * 0.15,
        width: width,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    titleText: {
        flexDirection: 'row',
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'left',
        color: "white"
    }
});
